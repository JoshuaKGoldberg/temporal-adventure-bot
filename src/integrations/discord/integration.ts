import * as discord from "discord.js";

import { settings } from "../../settings";
import { Integration, MessageId, TextIntegration } from "../types";
import { getDiscordClient } from "./client";
import { createDiscordTextIntegration } from "./text";

export class DiscordIntegration implements Integration {
  #channel: discord.TextBasedChannels;

  text: TextIntegration;

  private constructor(channel: discord.TextBasedChannels) {
    this.#channel = channel;
    this.text = createDiscordTextIntegration(channel.id);
  }

  async addReaction(messageId: string, name: string) {
    const message = await this.#channel.messages.fetch(messageId);
    const emoji = this.text.nameToEmoji(name);

    await message.react(emoji);
  }

  async getReactions(messageId: MessageId) {
    const message = await this.#channel.messages.fetch(messageId);
    const reactions = Array.from(message.reactions.cache.values());

    return reactions.map((reaction) => ({
      count: reaction.count,
      name: this.text.emojiToName(reaction.emoji.name!),
    }));
  }

  async pinMessage(messageId: MessageId) {
    const message = await this.#channel.messages.fetch(messageId);

    await message.pin();
  }

  async postMessage(text: string) {
    const message = await this.#channel.send(text);

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
