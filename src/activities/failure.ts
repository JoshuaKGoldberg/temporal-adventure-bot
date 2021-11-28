import { logger } from "../logger";
import { slack } from "../slack";

export interface FailureOptions {
  channel: string;
  error: string;
}

export async function failure({ channel, error }: FailureOptions) {
  logger.error(`Failed: ${error}.`);

  await slack.client.chat.postMessage({
    channel,
    text: `Well, darn. I can't continue the adventure 😢. ${error}`,
  });
}
