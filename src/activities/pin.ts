import { slack } from "../slack";
import { Result } from "../types";

export interface PinOptions {
  channel: string;
  messageId: string;
}

export async function pin({ channel, messageId }: PinOptions): Promise<Result> {
  console.log("Pinning message", messageId);

  const response = await slack.client.pins.add({
    channel,
    timestamp: messageId,
  });

  return response.error ? { error: response.error } : {};
}
