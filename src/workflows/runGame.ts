import { continueAsNew } from "@temporalio/workflow";

import { getForcedChoice, printForced } from "../api/force";
import { game } from "../game";
import { logger } from "../logger";
import { settings } from "../settings";
import { formatEntryData } from "../utils/entries";
import { checkRepeatedly } from "../utils/repeats";
import { collectConsensus } from "../utils/voting";
import { activities } from "./activities";

export interface RunGameOptions {
  entry: string;
}

export async function runGame({ entry }: RunGameOptions) {
  logger.info("Running game at", entry);

  const { options } = game[entry];

  // 1. If the entry has no options, the game is over
  if (!options) {
    logger.info("No choice: the game is over.");
    await activities.postMessage({
      notify: true,
      text: `
${game[entry].description}
...and, that's the end of the game. Thanks for playing everyone! :end:
`.trim(),
    });
    return;
  }

  // 2. Post the current entry as a poll
  const announcement = await activities.createPoll({
    choices: options.map((option) => option.description),
    prompt: `${formatEntryData(game[entry])}`,
  });
  logger.info(`Posted poll with message ID ${announcement}.`);

  // 3. Check and remind people to vote once a day until either...
  // * ...a choice is made by consensus
  // * ...an admin forces a choice
  const { choice, forced } = await Promise.race([
    checkRepeatedly(settings.interval, async () => {
      const reactions = await activities.getReactions({
        messageId: announcement,
      });

      const consensus = collectConsensus(options, reactions);

      switch (consensus) {
        case undefined:
          await activities.postMessage({
            notify: true,
            text: `Well, nobody posted, so... waiting another ${settings.interval}!`,
          });
          return undefined;

        case "tie":
          await activities.postMessage({
            notify: true,
            text: `Looks like there's a tie! Waiting another ${settings.interval} for you make up your minds.`,
          });
          return undefined;

        default:
          return consensus;
      }
    }),
    getForcedChoice(options),
  ]);

  // 4. If the choice was forced by an admin, mention that
  if (forced !== undefined) {
    logger.info("Forcing choice from:", forced);
    await activities.postMessage({
      text: printForced(forced),
    });
  }

  // 5. Continue with that chosen next step in the game
  logger.info("Received choice to continue:", choice);
  await continueAsNew({ entry: choice });
}
