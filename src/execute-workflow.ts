import { Connection, WorkflowClient } from "@temporalio/client";
import { sleep } from "@temporalio/workflow";

import { announceGame, runGame } from "./workflows";

async function run() {
  const connection = new Connection();
  const client = new WorkflowClient(connection.service);

  const channel = "random";
  const executionOptions = {
    taskQueue: "slack-adventure-bot",
    workflowId: "temporal-slack-adventure-bot",
  };

  while (true) {
    await client.execute(announceGame, {
      args: [channel],
      ...executionOptions,
    });

    await sleep("100 ms");

    await client.execute(runGame, {
      args: [
        {
          channel,
          entry: "begin",
        },
      ],
      ...executionOptions,
    });
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
