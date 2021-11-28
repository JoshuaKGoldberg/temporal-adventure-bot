import { continueAsNew } from "@temporalio/workflow";

import { activities } from "./activities";
import { logger } from "../logger";
import { formatEntryData } from "../utils/entries";
import { checkRepeatedly } from "../utils/repeats";
import { game } from "../game";

export interface PlayGameOptions {
  channel: string;
  entry: string;
}

export async function runGame({ channel, entry }: PlayGameOptions) {
  logger.info("Running game at", entry);

  // 1. Post the current entry as a Slack message in the channel
  const announcement = await activities.post({
    channel,
    text: `<!here> ${formatEntryData(game[entry])}`,
  });
  if ("error" in announcement) {
    await activities.failure({ channel, error: announcement.error });
    return;
  }

  logger.info(`Posted entry at timestamp ${announcement.data}.`);

  const { options } = game[entry];

  // 2. If the entry has no options, the game is over
  if (!options) {
    logger.info("No choice: the game is over.");
    await activities.finish({ channel });
    return;
  }

  // 3. Populate initial emoji reaction to the entry post
  await activities.populate({
    channel,
    count: options.length,
    messageId: announcement.data,
  });

  // 4. Continuously wait until there's another choice
  const choice = await checkRepeatedly(
    "5 seconds", // "1 day",
    async () =>
      await activities.check({ channel, entry, messageId: announcement.data })
  );
  if ("error" in choice) {
    await activities.failure({ channel, error: choice.error });
    return;
  }

  // 5. Continue with the chosen next step in the game
  logger.info("Received choice to continue", choice.data);
  await continueAsNew({ channel, entry: choice.data });
}
