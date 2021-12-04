import { sleep } from "@temporalio/workflow";

import { logger } from "../logger";

export async function checkRepeatedly<Data>(
  period: string,
  action: () => Promise<Data | undefined>
) {
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
