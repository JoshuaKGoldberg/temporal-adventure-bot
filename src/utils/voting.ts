import { Reaction } from "../platforms/types";
import { GameOption, NextChoice } from "../types";

export const collectConsensus = (
  options: GameOption[],
  reactions: Reaction[]
): NextChoice | "tie" | undefined => {
  // 1. Sort the options by how many votes they received
  const sortedReactions = [...reactions].sort((a, b) => b.count - a.count);

  // 2. If there are no votes at all, there's nothing we can do
  if (sortedReactions[0].count === 0) {
    return undefined;
  }

  // 2. If the top two are tied, there is no consensus
  if (sortedReactions[0].count === sortedReactions[1].count) {
    return "tie";
  }

  // 3. Give back the corresponding next step for the best emoji index
  return {
    choice: options[sortedReactions[0].index].next,
  };
};
