import { Reaction } from "../platforms/types";
import { GameOption, NextChoice } from "../types";

export const collectConsensus = (
  options: GameOption[],
  reactions: Reaction[]
): NextChoice | "none" | "tie" => {
  // 1. Ignore reactions people added that don't correspond to an option
  const optionReactions = reactions.filter(
    (reaction) => reaction.index >= 0 && reaction.index < options.length
  );

  // 2. Sort the options by how many votes they received
  const sortedReactions = [...optionReactions].sort((a, b) => b.count - a.count);

  // 3. If there are no votes at all, there's nothing we can do
  if (!sortedReactions.length || sortedReactions[0].count === 0) {
    return "none";
  }

  // 4. If the top two are tied, there is no consensus
  if (sortedReactions[1]?.count === sortedReactions[0].count) {
    return "tie";
  }

  // 5. Give back the corresponding next step for the best emoji index
  return {
    choice: options[sortedReactions[0].index].next,
  };
};
