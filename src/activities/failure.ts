import { slack } from "../slack";

export interface FailureOptions {
  channel: string;
  error: string;
}

export async function failure({ channel, error }: FailureOptions) {
  try {
    await slack.client.chat.postMessage({
      channel,
      text: `Well, darn. I can't continue the adventure 😢. ${error}`,
    });
  } catch (error) {
    console.warn("Failure oh no", { error });
    throw error;
  }
}
