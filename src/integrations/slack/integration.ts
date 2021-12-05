import * as bolt from "@slack/bolt";
import { WebAPICallResult } from "@slack/web-api";

import { settings } from "../../settings";
import { Integration, MessageId, Reaction, TextIntegration } from "../types";

export type SlackIntegrationSettings = Pick<
  bolt.AppOptions,
  "signingSecret" | "token"
>;

const throwIfError = (response: WebAPICallResult, defaultMessage?: string) => {
  if (response.error) {
    throw new Error(response.error ?? defaultMessage);
  }
};

export class SlackIntegration implements Integration {
  #slack: bolt.App;

  constructor(settings: SlackIntegrationSettings) {
    this.#slack = new bolt.App({
      logLevel: bolt.LogLevel.INFO,
      ...settings,
    });
  }

  async addReaction(messageId: string, name: string) {
    throwIfError(
      await this.#slack.client.reactions.add({
        channel: settings.slackChannel,
        timestamp: messageId,
        name,
      })
    );
  }

  async getReactions(messageId: MessageId) {
    const response = await this.#slack.client.reactions.get({
      channel: settings.slackChannel,
      timestamp: messageId,
    });

    const reactions = response.message?.reactions;

    if (!reactions) {
      throw new Error(response.error ?? "Could not retrieve reactions.");
    }

    return reactions as Reaction[];
  }

  async pinMessage(messageId: MessageId) {
    throwIfError(
      await this.#slack.client.pins.add({
        channel: settings.slackChannel,
        timestamp: messageId,
      })
    );
  }

  async postMessage(text: string) {
    const response = await this.#slack.client.chat.postMessage({
      channel: settings.slackChannel,
      text,
    });

    // Slack keeps timestamps as equivalents to unique IDs for messages.
    // https://api.slack.com/messaging/retrieving#individual_messages
    const messageId = response.message?.ts;

    if (!messageId) {
      throw new Error(response.error ?? "Could not post message");
    }

    return messageId;
  }

  text: TextIntegration = {
    atHere: "@here",
    emojiToName: (emoji) => emoji,
    nameToEmoji: (name) => name,
  };
}
