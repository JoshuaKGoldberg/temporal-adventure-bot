import { logger } from "../logger";
import { activities } from "./activities";

const announcement = `
:wave: Hey everyone! We're going to be playing a little choose-your-own adventure game together! :raised_hands: 

The game is simple:
1. :speech_balloon: Each day starting today, I'll post a game prompt in this channel describing where you are.
2. :ballot_box_with_ballot: That prompt will have >=2 next step options anybody can emoji react to vote on for the next 24 hours.
3. :ballot_box_with_check: After the voting period closes, I'll take the step with the most votes and post again, going back to step 1.
4. :checkered_flag: Eventually you'll finish the game -- and if you chose wisely, the ending will be a good one!

...and that's about it! :sunrise_over_mountains: 
`.trim();

export async function instructions() {
  logger.info("Posting instructions");

  const messageId = await activities.post({
    text: announcement,
  });

  logger.info("Pinning post", messageId);

  await activities.pin({ messageId });
}
