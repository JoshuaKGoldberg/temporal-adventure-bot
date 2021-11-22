import { slack } from "../slack";

export interface FinishOptions {
  channel: string;
}

export const finish = async function finish({ channel }: FinishOptions) {
  try {
    await slack.client.chat.postMessage({
      channel,
      text: `You won the game! Congrats! No more games for you.`,
    });
  } catch (error) {
    console.warn("Finish oh no", { error });
    throw error;
  }
};
