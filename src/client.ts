import { Connection, WorkflowClient } from "@temporalio/client";

import { receiveCommandText } from "./api/force";
import { platformFactory } from "./platforms/factory";
import { settings } from "./settings";
import { instructions, runGame } from "./workflows";

const executionOptions = {
  taskQueue: settings.taskQueue,
  workflowId: settings.workflowId,
};

async function run() {
  // 1. Create a connection to the Temporal service and a workflow client against it
  const connection = new Connection();
  const client = new WorkflowClient(connection.service);

  // 2. Log and pin channel-wide instructions just once
  await client.execute(instructions, executionOptions);

  // 3. Start the workflow that checks once a day for choice consensus
  const runningGame = client.execute(runGame, {
    args: [
      {
        entry: "begin",
      },
    ],
    ...executionOptions,
  });

  // 4. Retrieve a handle to the client workflow so admin commands can signal to it
  const gameHandle = client.getHandle(executionOptions.workflowId);

  // 5. Start an HTTP server to receive /force commands
  const { createServer } = platformFactory();
  const closeServer = await createServer(
    async (text) => await receiveCommandText(gameHandle, text)
  );

  // 6. Wait for the result of finishing the game, then close the server
  await runningGame;
  closeServer();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
