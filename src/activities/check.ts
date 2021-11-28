import { game } from "../game";
import { logger } from "../logger";
import { slack } from "../slack";
import { getBestReaction } from "../text";
import { Result } from "../types";

export interface CheckOptions {
  channel: string;
  entry: string;
  messageId: string;
}

export async function check({
  channel,
  entry,
  messageId,
}: CheckOptions): Promise<Result<string> | undefined> {
  console.log("Checking", messageId);

  // 1. Search for the message in channel history
  const response = await slack.client.reactions.get({
    channel,
    timestamp: messageId,
  });
  if (!response.message) {
    return { error: response.error ?? "Could not retrieve reactions." };
  }

  // 2. Count the reactions to see what people have voted on
  const reactions =
    response.message.reactions?.map((reaction) => reaction.name!) ?? [];
  const bestIndex = getBestReaction(reactions);

  console.log("Found reactions with bestIndex ", { reactions, bestIndex });

  // 3. If nothing was voted on, give nothing back
  if (bestIndex === undefined) {
    return undefined;
  }

  // 4. Give back the corresponding next step for the best emoji index
  return {
    data: game[entry].options![bestIndex].next,
  };
}
