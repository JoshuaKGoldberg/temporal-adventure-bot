import { Connection, WorkflowClient, WorkflowHandle } from "@temporalio/client";
import { Workflow } from "@temporalio/common";
import ms from "ms";

import { receiveCommandText } from "./api/force";
import { createPostServer } from "./api/server";
import { settings } from "./settings";
import { instructions, runGame } from "./workflows";
import { startGame } from "./workflows/startGame";

async function run() {
  const connection = new Connection();
  const client = new WorkflowClient(connection.service);

  const executionOptions = {
    taskQueue: "slack-adventure-bot",
    workflowId: "temporal-slack-adventure-bot",
  };

  let gameHandle: WorkflowHandle<Workflow> | undefined;

  await createPostServer((text) => receiveCommandText(gameHandle, text));

  await client.execute(instructions, {
    args: [settings.channel],
    ...executionOptions,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  while (true) {
    await client.execute(startGame, {
      args: [settings.channel],
      ...executionOptions,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const runningGame = client.execute(runGame, {
      args: [
        {
          channel: settings.channel,
          entry: "begin",
        },
      ],
      ...executionOptions,
    });

    gameHandle = client.getHandle(executionOptions.workflowId);

    await runningGame;

    await new Promise((resolve) => setTimeout(resolve, ms(settings.interval)));
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
