import { slack } from "../api/slack";
import { settings } from "../settings";

const message = `
...and, that's the end of the game. Thanks for playing everyone! :end: 
`.trim();

export const finish = async function finish() {
  await slack.client.chat.postMessage({
    channel: settings.channel,
    text: message,
  });
};
