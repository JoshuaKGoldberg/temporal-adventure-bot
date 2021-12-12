import * as discord from "discord.js";

import { settings } from "../../settings";
import { emojiNameToIndex, indexToEmojiName } from "../../utils/entries";
import {
  CreatePollOptions,
  Integration,
  MessageId,
  PostMessageOptions,
} from "../types";
import { getDiscordClient } from "./client";

const emojiNameToSymbol: Record<string, string> = {
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
};

const emojiToName: Record<string, string> = Object.fromEntries(
  Object.entries(emojiNameToSymbol).map(([name, emoji]) => [emoji, name])
);

export class DiscordIntegration implements Integration {
  #channel: discord.TextBasedChannels;

  private constructor(channel: discord.TextBasedChannels) {
    this.#channel = channel;
  }

  async createPoll(options: CreatePollOptions) {
    const message = await this.#channel.send(options.prompt);

    await Promise.all(
      options.choices.map(async (_, index) => {
        await message.react(emojiNameToSymbol[indexToEmojiName[index]]);
      })
    );

    return message.id;
  }

  async getReactions(messageId: MessageId) {
    const message = await this.#channel.messages.fetch(messageId);
    const reactions = Array.from(message.reactions.cache.values());

    return reactions.map((reaction) => ({
      // We reduce count by 1 since this bot gives 1 vote to every option
      count: reaction.count - 1,
      index: emojiNameToIndex[reaction.emoji.name!],
    }));
  }

  async pinMessage(messageId: MessageId) {
    const message = await this.#channel.messages.fetch(messageId);

    await message.pin();
  }

  async postMessage({ notify, text }: PostMessageOptions) {
    const message = await this.#channel.send(
      notify ? `${this.#channel} ${text}` : text
    );

    return message.id;
  }

  static async create() {
    const client = await getDiscordClient();
    const channel = await client.channels.fetch(settings.discordChannel);

    if (!channel?.isText()) {
      throw new Error("Channel is not text.");
    }

    return new DiscordIntegration(channel);
  }
}
