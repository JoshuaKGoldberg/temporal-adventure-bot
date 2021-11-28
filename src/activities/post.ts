import { logger } from "../logger";
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
  logger.info(`Posting: ${JSON.stringify({ channel, text })}`);
  try {
    const response = await slack.client.chat.postMessage({
      channel,
      text: `@here ${text}`,
    });
    logger.info("Announce a " + JSON.stringify({ response }));

    // Slack keeps timestamps as equivalents to unique IDs for messages.
    // https://api.slack.com/messaging/retrieving#individual_messages
    const messageId = response.message?.ts;

    return messageId
      ? { data: messageId }
      : { error: response.error ?? "Unknown error" };
  } catch (error) {
    console.warn("Announce oh no", { error });
    throw error;
  }
}
