import { game } from "../game";
import { Integration } from "../integrations/types";
import { NextChoice } from "../types";
import { emojiToIndex } from "../utils/entries";

export interface CheckOptions {
  entry: string;
  messageId: string;
}

export async function check(
  integration: Integration,
  { entry, messageId }: CheckOptions
): Promise<NextChoice | undefined> {
  // 1. Search for the message in channel history
  const reactions = await integration.getReactions(messageId);

  // 2. Count the reactions to see what people have voted on
  const bestReaction = reactions.reduce((previous, next) =>
    previous.count > next.count ? previous : next
  );

  // 3. If nothing was voted on except for the automatic populated reaction, give nothing back
  if (bestReaction === undefined || bestReaction.count === 1) {
    await integration.postMessage(
      "Well, nobody posted, so... waiting another day!"
    );
    return undefined;
  }

  // 4. Give back the corresponding next step for the best emoji index
  return {
    choice: game[entry].options![emojiToIndex.get(bestReaction.name)!].next,
  };
}
