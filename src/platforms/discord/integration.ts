import * as discord from "discord.js";

import {
  emojiNameToIndex,
  emojiNameToSymbol,
  emojiSymbolToName,
  indexToEmojiName,
} from "../../utils/entries";
import {
  CreatePollOptions,
  Integration,
  MessageId,
  PostMessageOptions,
} from "../types";
import { getDiscordClient } from "./client";

export class DiscordIntegration implements Integration {
  #channel: discord.TextBasedChannels;

  private constructor(channel: discord.TextBasedChannels) {
    this.#channel = channel;
  }

  async createPoll(options: CreatePollOptions) {
    const message = await this.#channel.send(options.prompt);

    for (let i = 0; i < options.choices.length; i += 1) {
      await message.react(emojiNameToSymbol[indexToEmojiName[i]]);
    }

    return message.id;
  }

  async getReactions(messageId: MessageId) {
    const message = await this.#channel.messages.fetch(messageId);
    const reactions = Array.from(message.reactions.cache.values());

    return reactions.map((reaction) => ({
      // We reduce count by 1 since this bot gives 1 vote to every option
      count: reaction.count - 1,
      index: emojiNameToIndex[emojiSymbolToName[reaction.emoji.name!]],
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

  static create = async () => {
    const client = await getDiscordClient();
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL);

    if (!channel?.isText()) {
      throw new Error("Channel is not text.");
    }

    return new DiscordIntegration(channel);
  };
}
