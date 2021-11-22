import { GameEntry } from "./types";

const indexToEmoji = ["one", "two", "three", "four", "five", "six", "seven"];

const emojiToIndex = new Map(
  indexToEmoji.map((emoji, index) => [emoji, index] as const)
);

export function formatEntryData(data: GameEntry) {
  return [
    data,
    "",
    "Options:",
    ...(data.options?.map(
      (option, i) => `* :${indexToEmoji[i]}:: ${option}`
    ) ?? ["Fin"]),
  ].join("\n");
}

export function getBestReaction(reactions: string[]) {
  let best: [string, number] | undefined;
  let counts = new Map<number, number>();

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
