import { game } from "../game";
import { slack } from "../slack";
import { emojiToIndex } from "../utils/entries";
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
  if (!response.message?.reactions) {
    return { error: response.error ?? "Could not retrieve reactions." };
  }

  console.log("Received reactions", response.message.reactions);

  // 2. Count the reactions to see what people have voted on
  const bestReaction = response.message.reactions.reduce((previous, next) =>
    previous.count! > next.count! ? previous : next
  );

  console.log("Best reaction is", bestReaction);

  // 3. If nothing was voted on except for the automatic populated reaction, give nothing back
  if (bestReaction === undefined || bestReaction.count === 1) {
    return undefined;
  }

  // 4. Give back the corresponding next step for the best emoji index
  return {
    data: game[entry].options![emojiToIndex.get(bestReaction.name!)!].next,
  };
}
