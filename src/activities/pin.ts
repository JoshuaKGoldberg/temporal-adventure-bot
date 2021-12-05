import { Integration } from "../integrations/types";

export interface PinOptions {
  messageId: string;
}

export async function pin(integration: Integration, { messageId }: PinOptions) {
  return await integration.pinMessage(messageId);
}
