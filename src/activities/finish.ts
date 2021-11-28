import { slack } from "../slack";

export interface FinishOptions {
  channel: string;
}

const message = `
...and, that's the end of the game. Thanks for playing everyone! :end: 
`.trim();

export const finish = async function finish({ channel }: FinishOptions) {
  await slack.client.chat.postMessage({
    channel,
    text: message,
  });
};
