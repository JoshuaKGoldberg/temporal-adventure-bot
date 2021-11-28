import { continueAsNew } from "@temporalio/workflow";

import { activities } from "./activities";
import { logger } from "../logger";
import { checkExponentially } from "../tasks";
import { formatEntryData } from "../text";
import { game } from "../game";

export interface PlayGameOptions {
  channel: string;
  entry: string;
}

export async function runGame({ channel, entry }: PlayGameOptions) {
  logger.info(`Running game: ${JSON.stringify({ channel, entry })}`);

  // 1. Post the current Slack message in the channel
  const announcement = await activities.post({
    channel,
    text: formatEntryData(game[entry]),
  });
  if ("error" in announcement) {
    await activities.failure({ channel, error: announcement.error });
    return;
  }

  logger.info(`Posted announcement at timestamp ${announcement.data}.`);

  // 2. Continuously wait, reminding people until a step is chosen
  const choice = await checkExponentially(async () =>
    activities.check({ channel, entry, messageId: announcement.data })
  );
  if ("error" in choice) {
    await activities.failure({ channel, error: choice.error });
    return;
  }

  // 3. If a next step was able to be chosen, continue with it
  if (choice.data) {
    logger.info(`Received choice to continue: ${choice.data}`);
    await continueAsNew({ channel, entry: choice.data });
    return;
  }

  // 4. The game is over.
  logger.info(`No choice: the game is over.`);
  await activities.finish({ channel });
}
