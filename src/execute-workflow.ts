import { Connection, WorkflowClient } from "@temporalio/client";
import ms from "ms";
import { forceSignal } from "./api/force";

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

  await client.execute(instructions, {
    args: [settings.channel],
    ...executionOptions,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  while (true) {
    client.signalWithStart;
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

    const gameHandle = client.getHandle(executionOptions.workflowId);

    // Todo: move this to a Slack API handler
    setTimeout(() => {
      gameHandle.signal(forceSignal, "random");
    }, ms("2 seconds"));

    await runningGame;

    await new Promise((resolve) => setTimeout(resolve, ms(settings.interval)));
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
