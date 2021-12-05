import { continueAsNew } from "@temporalio/workflow";

import { getForcedChoice, printForced } from "../api/force";
import { logger } from "../logger";
import { settings } from "../settings";
import { formatEntryData } from "../utils/entries";
import { checkRepeatedly } from "../utils/repeats";
import { game } from "../game";
import { activities } from "./activities";

export interface RunGameOptions {
  entry: string;
}

export async function runGame({ entry }: RunGameOptions) {
  logger.info("Running game at", entry);

  // 1. Post the current entry as a Slack message in the channel
  const announcement = await activities.post({
    text: `<!here> ${formatEntryData(game[entry])}`,
  });

  logger.info(`Posted entry at timestamp ${announcement}.`);

  const { options } = game[entry];

  // 2. If the entry has no options, the game is over
  if (!options) {
    logger.info("No choice: the game is over.");
    await activities.finish();
    return;
  }

  // 3. Populate initial emoji reaction to the entry post
  await activities.populate({
    count: options.length,
    messageId: announcement,
  });

  // 4. Continuously wait until a choice comes on the schedule or from an admin
  const { choice, forced } = await Promise.race([
    checkRepeatedly(
      settings.interval,
      async () => await activities.check({ entry, messageId: announcement })
    ),
    getForcedChoice(options),
  ]);

  // 5. If the choice was forced by an admin, mention that
  if (forced !== undefined) {
    logger.info("Forcing choice from:", forced);
    await activities.post({
      text: printForced(forced),
    });
  }

  // 6. Continue with that chosen next step in the game
  logger.info("Received choice to continue:", choice);
  await continueAsNew({ entry: choice });
}
