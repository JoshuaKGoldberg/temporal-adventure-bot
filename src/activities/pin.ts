import { slack } from "../api/slack";
import { settings } from "../settings";

export interface PinOptions {
  messageId: string;
}

export async function pin({ messageId }: PinOptions) {
  console.log("Pinning message", messageId);

  const response = await slack.client.pins.add({
    channel: settings.channel,
    timestamp: messageId,
  });

  if (response.error) {
    throw new Error(response.error);
  }
}
