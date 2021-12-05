import { Worker } from "@temporalio/worker";
import { WorkflowInfo } from "@temporalio/workflow";
import * as dotenv from "dotenv";

import { createActivities } from "./activities";
import { SlackIntegration } from "./integrations/slack";
import { settings } from "./settings";

dotenv.config();

async function run() {
  const integration = new SlackIntegration({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
  });

  const sinks = {
    logger: {
      info: {
        fn(workflowInfo: WorkflowInfo, message: string, data?: unknown) {
          console.log(
            "workflow: ",
            workflowInfo.runId,
            "message: ",
            message,
            ...(data ? [JSON.stringify(data)] : [])
          );
        },
      },
    },
  };

  const worker = await Worker.create({
    activities: createActivities(integration),
    sinks,
    taskQueue: settings.taskQueue,
    workflowsPath: require.resolve("./workflows"),
  });
  await worker.run();
}

run().catch((err) => {
  console.error("Oh no:", err);
  process.exit(1);
});
