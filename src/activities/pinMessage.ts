import { Integration } from "../platforms/types";

export interface PinMessageOptions {
  messageId: string;
}

export async function pinMessage(
  integration: Integration,
  { messageId }: PinMessageOptions
) {
  return await integration.pinMessage(messageId);
}
