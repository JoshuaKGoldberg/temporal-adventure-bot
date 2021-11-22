import { continueAsNew, proxyActivities } from "@temporalio/workflow";

import type * as activities from "./activities";
import { checkExponentially } from "./tasks";
import { logger } from "./logger";
import { GameOptions } from "./types";

const proxiedActivities = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export async function playGame({ channel, entry }: GameOptions) {
  logger.info("a" + JSON.stringify({ channel, entry }));

  if (Math.random()) {
    throw new Error("Oh no!");
  }

  try {
    // 1. Post the current Slack message in the channel
    logger.info("b");
    const announcement = await proxiedActivities.announce({ channel, entry });
    logger.info("c" + JSON.stringify({ announcement }));
    if ("error" in announcement) {
      await proxiedActivities.failure({ channel, error: announcement.error });
      return;
    }

    // 2. Continuously wait, reminding people until a step is chosen
    const choice = await checkExponentially(async () =>
      proxiedActivities.check({ channel, entry, messageId: announcement.data })
    );
    logger.info("d" + JSON.stringify({ choice }));
    if ("error" in choice) {
      await proxiedActivities.failure({ channel, error: choice.error });
      return;
    }

    // 3. If a next step was able to be chosen, continue with it
    if (choice.data) {
      await continueAsNew({ channel, entry: choice.data });
      return;
    }

    // 4. The game is over.
    await proxiedActivities.finish({ channel });
  } catch (error) {
    console.error("playGame oh no", { error });
  }
}
