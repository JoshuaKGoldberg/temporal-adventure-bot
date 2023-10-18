import { GameEntry } from "../types";

export const indexToEmojiName = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
];

export const emojiNameToIndex = Object.fromEntries(
  indexToEmojiName.map((emoji, index) => [emoji, index] as const)
);

export const emojiNameToSymbol: Record<string, string> = {
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
};

export const emojiSymbolToName = Object.fromEntries(
  Object.entries(emojiNameToSymbol).map(
    ([emoji, index]) => [index, emoji] as const
  )
);

export function formatEntryData(entry: GameEntry) {
  if (!entry.options) {
    return entry.description.join("\n");
  }

  return [
    ...entry.description,
    "",
    "Options:",
    ...entry.options.map(
      (option, i) => `- :${indexToEmojiName[i]}:: ${option.description}`
    ),
  ].join("\n");
}
