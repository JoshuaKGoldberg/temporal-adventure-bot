import { slack } from "../slack";
import { Result } from "../types";

export interface PostOptions {
  channel: string;
  text: string;
}

export async function post({
  channel,
  text,
}: PostOptions): Promise<Result<string>> {
  console.log("Posting", { channel, text });
  const response = await slack.client.chat.postMessage({
    channel,
    text,
  });

  // Slack keeps timestamps as equivalents to unique IDs for messages.
  // https://api.slack.com/messaging/retrieving#individual_messages
  const messageId = response.message?.ts;

  if (messageId) {
    console.log("Posted message ID", messageId);
    return { data: messageId };
  }

  const error = response.error ?? "Unknown error";
  console.log("Error posting", error);
  return { error };
}
