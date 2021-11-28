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

export function formatEntryData(data: GameEntry) {
  if (!data.options) {
    return data.description;
  }

  return [
    data.description,
    "",
    "Options:",
    ...data.options.map(
      (option, i) => `- :${indexToEmoji[i]}:: ${option.description}`
    ),
  ].join("\n");
}
