import { slack } from "../api/slack";
import { indexToEmoji } from "../utils/entries";

export interface PopulateOptions {
  channel: string;
  count: number;
  messageId: string;
}

export async function populate({ channel, count, messageId }: PopulateOptions) {
  console.log("Populating emoji reactions", { count, messageId });

  await Promise.all(
    new Array(count).fill(undefined).map(
      async (_, i) =>
        await slack.client.reactions.add({
          channel,
          timestamp: messageId,
          name: indexToEmoji[i],
        })
    )
  );
}
