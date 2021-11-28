import { sleep } from "@temporalio/workflow";

import { logger } from "./logger";

const period = "ms"; // "days"

export async function checkExponentially<Result>(
  action: () => Promise<Result | undefined>
) {
  let amount = 1;

  while (true) {
    const wait = `${amount} ${period}`;
    logger.info(`Waiting ${wait}...`);
    await sleep(wait);
    logger.info("Trying again.");

    const result = await action();
    if (result !== undefined) {
      logger.info(`Got a result: ${result}`);
      return result;
    }

    amount *= 2;
  }
}
