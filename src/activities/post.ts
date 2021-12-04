import { slack } from "../api/slack";

export interface PostOptions {
  channel: string;
  text: string;
}

export async function post({ channel, text }: PostOptions): Promise<string> {
  console.log("Posting", { channel, text });
  const response = await slack.client.chat.postMessage({
    channel,
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
