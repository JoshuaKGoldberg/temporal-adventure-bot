import { slack } from "../api/slack";
import { settings } from "../settings";

export interface PostOptions {
  text: string;
}

export async function post({ text }: PostOptions): Promise<string> {
  console.log("Posting", { text });
  const response = await slack.client.chat.postMessage({
    channel: settings.channel,
    text,
  });

  // Slack keeps timestamps as equivalents to unique IDs for messages.
  // https://api.slack.com/messaging/retrieving#individual_messages
  const messageId = response.message?.ts;

  if (!messageId) {
    throw new Error(
      `Error posting message: ${response.error ?? "Unknown error"}`
    );
  }

  return messageId;
}
