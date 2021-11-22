import { game } from "../game";
import { logger } from "../logger";
import { slack } from "../slack";
import { formatEntryData } from "../text";
import { Result, GameOptions } from "../types";

export async function announce({
  channel,
  entry,
}: GameOptions): Promise<Result<string>> {
  logger.info("Announce " + JSON.stringify({ channel, entry }));
  try {
    const response = await slack.client.chat.postMessage({
      channel,
      text: formatEntryData(game[entry]),
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
