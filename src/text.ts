import { GameEntry } from "./types";

const indexToEmoji = ["one", "two", "three", "four", "five", "six", "seven"];

const emojiToIndex = new Map(
  indexToEmoji.map((emoji, index) => [emoji, index] as const)
);

// todo; maybe return the emojis also, for a reaction?
export function formatEntryData(data: GameEntry) {
  return [
    data.description,
    "",
    "Options:",
    ...(data.options?.map(
      (option, i) => `- :${indexToEmoji[i]}:: ${option.description}`
    ) ?? ["Fin"]),
  ].join("\n");
}

// todo: factor in emojis already being posted
export function getBestReaction(reactions: string[]) {
  const counts = new Map<number, number>();
  let best: [string, number] | undefined;

  for (const reaction of reactions) {
    const index = emojiToIndex.get(reaction);
    if (index === undefined) {
      continue;
    }

    const newCount = (counts.get(index) ?? 0) + 1;
    if (!best || newCount > best[1]) {
      best = [reaction, newCount];
    }
  }

  return best ? emojiToIndex.get(best[0]) : undefined;
}
