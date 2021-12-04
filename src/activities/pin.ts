import { slack } from "../api/slack";

export interface PinOptions {
  channel: string;
  messageId: string;
}

export async function pin({ channel, messageId }: PinOptions) {
  console.log("Pinning message", messageId);

  const response = await slack.client.pins.add({
    channel,
    timestamp: messageId,
  });

  if (response.error) {
    throw new Error(response.error);
  }
}
