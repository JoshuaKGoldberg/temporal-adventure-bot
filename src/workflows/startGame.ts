import { activities } from "./activities";

const announcement = `
:arrow_right: *Let the game begin!*
`.trim();

export async function startGame(): Promise<void> {
  await activities.post({
    text: announcement,
  });
}
