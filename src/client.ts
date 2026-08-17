import { Connection, WorkflowClient } from "@temporalio/client";

import { receiveCommandText } from "./api/force";
import { platformFactory } from "./platforms/factory";
import { settings } from "./settings";
import { instructions, runGame } from "./workflows";

// Temporal 0.16 reports both of these as bare gRPC errors, with no typed
// equivalent to catch on
const GRPC_NOT_FOUND = 5;
const GRPC_ALREADY_EXISTS = 6;

const hasGrpcCode = (error: unknown, code: number) =>
  error instanceof Error && (error as Error & { code?: number }).code === code;

const executionOptions = {
  taskQueue: settings.taskQueue,
  workflowId: settings.workflowId,
};

const postInstructionsOnce = async (client: WorkflowClient) => {
  try {
    await client.getHandle(settings.instructionsWorkflowId).describe();
    console.log("Instructions are already posted, so leaving them be.");
    return;
  } catch (error) {
    if (!hasGrpcCode(error, GRPC_NOT_FOUND)) {
      throw error;
    }
  }

  await client.execute(instructions, {
    ...executionOptions,
    workflowId: settings.instructionsWorkflowId,
  });
};

const startGameUnlessRunning = async (client: WorkflowClient) => {
  try {
    await client.start(runGame, {
      args: [
        {
          entry: "begin",
        },
      ],
      ...executionOptions,
    });
  } catch (error) {
    if (!hasGrpcCode(error, GRPC_ALREADY_EXISTS)) {
      throw error;
    }

    console.log("A game is already running, so picking that one back up.");
  }
};

async function run() {
  // 1. Create a connection to the Temporal service and a workflow client against it
  const connection = new Connection();
  const client = new WorkflowClient(connection.service);

  // 2. Log and pin channel-wide instructions just once, even across restarts
  await postInstructionsOnce(client);

  // 3. Start the workflow that checks for choice consensus, unless one is already going
  await startGameUnlessRunning(client);

  // 4. Retrieve a handle to the client workflow so admin commands can signal to it
  const gameHandle = client.getHandle(executionOptions.workflowId);

  // 5. Start an HTTP server to receive /force commands
  const { createServer } = platformFactory();
  const closeServer = await createServer(
    async (text) => await receiveCommandText(gameHandle, text)
  );

  // 6. Wait for the result of finishing the game, then close the server
  await gameHandle.result();
  closeServer();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
