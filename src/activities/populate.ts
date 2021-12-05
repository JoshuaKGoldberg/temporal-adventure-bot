import { slack } from "../api/slack";
import { settings } from "../settings";
import { indexToEmoji } from "../utils/entries";

export interface PopulateOptions {
  count: number;
  messageId: string;
}

export async function populate({ count, messageId }: PopulateOptions) {
  console.log("Populating emoji reactions", { count, messageId });

  await Promise.all(
    new Array(count).fill(undefined).map(
      async (_, i) =>
        await slack.client.reactions.add({
          channel: settings.channel,
          timestamp: messageId,
          name: indexToEmoji[i],
        })
    )
  );
}
