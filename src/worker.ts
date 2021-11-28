import { Worker } from "@temporalio/worker";
import { WorkflowInfo } from "@temporalio/workflow";

import * as activities from "./activities";

async function run() {
  const sinks = {
    logger: {
      info: {
        fn(workflowInfo: WorkflowInfo, message: string) {
          console.log("workflow: ", workflowInfo.runId, "message: ", message);
        },
        callDuringReplay: false, // The default
      },
    },
  };
  const worker = await Worker.create({
    activities,
    taskQueue: "slack-adventure-bot",
    workflowsPath: require.resolve("./workflows"),
    sinks,
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
