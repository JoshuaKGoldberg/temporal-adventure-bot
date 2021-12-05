import { TextIntegration } from "../types";

const nameToEmoji: Record<string, string> = {
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
};

const emojiToName: Record<string, string> = Object.fromEntries(
  Object.entries(nameToEmoji).map(([name, emoji]) => [emoji, name])
);

export const createDiscordTextIntegration = (
  channelId: string
): TextIntegration => ({
  atHere: `<#${channelId}>`,
  emojiToName: (emoji) => emojiToName[emoji],
  nameToEmoji: (name) => nameToEmoji[name],
});
