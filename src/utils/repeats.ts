import { sleep } from "@temporalio/workflow";

import { logger } from "../logger";

export async function checkRepeatedly<Data>(
  period: string,
  action: () => Promise<Data | undefined>
) {
  // Note: we use a "busy" poll inside the Workflow here for simplicity, which is fine for a daily poll.
  // However, more frequent polls should poll using a server side retry or a long running activity: 
  // https://community.temporal.io/t/what-is-the-best-practice-for-a-polling-activity/328
  while (true) {
    logger.info(`Waiting ${period}...`);
    await sleep(period);
    logger.info("Trying again.");

    const result = await action();
    if (result !== undefined) {
      logger.info("Got a result", result);
      return result;
    }
  }
}
