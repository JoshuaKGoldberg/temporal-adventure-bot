import { Integration } from "../integrations/types";
import { indexToEmoji } from "../utils/entries";

export interface PopulateOptions {
  count: number;
  messageId: string;
}

export async function populate(
  integration: Integration,
  { count, messageId }: PopulateOptions
) {
  console.log("Populating emoji reactions", { count, messageId });

  await Promise.all(
    new Array(count)
      .fill(undefined)
      .map(
        async (_, i) =>
          await integration.addReaction(messageId, indexToEmoji[i])
      )
  );
}
