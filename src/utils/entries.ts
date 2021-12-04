import { GameEntry } from "../types";

export const indexToEmoji = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
];

export const emojiToIndex = new Map(
  indexToEmoji.map((emoji, index) => [emoji, index] as const)
);

export function formatEntryData(entry: GameEntry) {
  if (!entry.options) {
    return entry.description;
  }

  return [
    entry.description,
    "",
    "Options:",
    ...entry.options.map(
      (option, i) => `- :${indexToEmoji[i]}:: ${option.description}`
    ),
  ].join("\n");
}
