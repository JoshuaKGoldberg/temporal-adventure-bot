import { Worker } from "@temporalio/worker";
import { WorkflowInfo } from "@temporalio/workflow";

import * as activities from "./activities";

async function run() {
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
    activities,
    sinks,
    taskQueue: "slack-adventure-bot",
    workflowsPath: require.resolve("./workflows"),
  });
  await worker.run();
}

run().catch((err) => {
  console.error("Oh no:", err);
  process.exit(1);
});
