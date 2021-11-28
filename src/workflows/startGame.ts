import { activities } from "./activities";

const announcement = `
:arrow_right: *Let the game begin!*
`.trim();

export async function startGame(channel: string): Promise<void> {
  await activities.post({
    channel,
    text: announcement,
  });
}
