import { Worker } from "@temporalio/worker";

import { createActivities } from "./activities";
import { platformFactory } from "./platforms/factory";
import { settings } from "./settings";

async function run() {
  const { createIntegration } = platformFactory();
  const integration = await createIntegration();

  const worker = await Worker.create({
    activities: createActivities(integration),
    sinks: {
      logger: {
        info: {
          fn(workflowInfo, message, data?) {
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
    },
    taskQueue: settings.taskQueue,
    workflowsPath: require.resolve("./workflows"),
  });
  await worker.run();
}

run().catch((err) => {
  console.error("Oh no:", err);
  process.exit(1);
});
