import { Connection, WorkflowClient } from "@temporalio/client";

import { instructions, runGame } from "./workflows";
import { startGame } from "./workflows/startGame";

// Todo: take in from options somewhere?
const options = {
  betweenGames: 10_000,
  channel: "C02MM315NPR",
};

async function run() {
  const { channel } = options;
  const connection = new Connection();
  const client = new WorkflowClient(connection.service);

  const executionOptions = {
    taskQueue: "slack-adventure-bot",
    workflowId: "temporal-slack-adventure-bot",
  };

  await client.execute(instructions, {
    args: [channel],
    ...executionOptions,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  while (true) {
    await client.execute(startGame, {
      args: [channel],
      ...executionOptions,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    await client.execute(runGame, {
      args: [
        {
          channel,
          entry: "begin",
        },
      ],
      ...executionOptions,
    });

    await new Promise((resolve) => setTimeout(resolve, options.betweenGames));
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
