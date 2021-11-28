import { game } from "../game";
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
}: CheckOptions): Promise<Result<string | undefined>> {
  // 1. Search for the message in channel history
  const history = await slack.client.conversations.history({
    channel,
    latest: messageId,
  });
  if (!history.messages?.length) {
    return { error: "Could not find message in history. Was it deleted?" };
  }

  // 2. Count the reactions to see what people have voted on
  const reactions =
    history.messages[0]?.reactions?.map((reaction) => reaction.name!) ?? [];
  const bestIndex = getBestReaction(reactions);

  // 3. If nothing was voted on, give nothing back
  if (bestIndex === undefined) {
    return { data: undefined };
  }

  // 4. Give back the corresponding next step for the best emoji index
  return {
    data: game[entry].options![bestIndex].next,
  };
}
