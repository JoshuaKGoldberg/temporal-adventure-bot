import { Integration } from "../platforms/types";

export interface GetReactionsOptions {
  messageId: string;
}

export async function getReactions(
  integration: Integration,
  { messageId }: GetReactionsOptions
) {
  return await integration.getReactions(messageId);
}
