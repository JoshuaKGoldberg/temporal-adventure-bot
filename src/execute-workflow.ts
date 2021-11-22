import { Connection, WorkflowClient } from "@temporalio/client";
import { logger } from "./logger";

import { playGame } from "./workflows";

console.log("Inside execute-workflow...");

async function run() {
  console.log("Starting to run??");
  const connection = new Connection();
  console.log("After connection");
  const client = new WorkflowClient(connection.service);
  console.log("After client");

  const result = await client.execute(playGame, {
    args: [
      {
        channel: "random",
        entry: "begin",
      },
    ],
    taskQueue: "tutorial",
    workflowId: "temporal-slack-adventure-bot",
  });
  console.log("Done with result " + JSON.stringify(result));
  logger.info("Done with result " + JSON.stringify(result));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
