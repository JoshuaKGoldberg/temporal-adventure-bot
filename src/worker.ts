import { Worker } from "@temporalio/worker";

import * as activities from "./activities";

async function run() {
  const sinks = {
    logger: {
      info: {
        fn(workflowInfo: any, message: string) {
          console.log("workflow: ", workflowInfo.runId, "message: ", message);
        },
        callDuringReplay: false, // The default
      },
    },
  };
  const worker = await Worker.create({
    activities,
    taskQueue: "default",
    workflowsPath: require.resolve("./workflows"),
    sinks,
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
