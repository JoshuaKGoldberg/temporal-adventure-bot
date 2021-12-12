import * as bolt from "@slack/bolt";
import { WebAPICallResult } from "@slack/web-api";
import { logger } from "../../logger";

import { settings } from "../../settings";
import { emojiNameToIndex, indexToEmojiName } from "../../utils/entries";
import {
  CreatePollOptions,
  Integration,
  MessageId,
  PostMessageOptions,
} from "../types";

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

  async createPoll(options: CreatePollOptions) {
    const messageId = await this.postMessage({
      notify: true,
      text: options.prompt,
    });

    logger.info("Hello  from logger", options);
    console.log("Hello from console", { options }, options.choices);

    await Promise.all(
      options.choices.map(async (_, index) =>
        throwIfError(
          await this.#slack.client.reactions.add({
            channel: settings.slackChannel,
            timestamp: messageId,
            name: indexToEmojiName[index],
          })
        )
      )
    );

    return messageId;
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

    return reactions.map((reaction) => ({
      // We reduce count by 1 since this bot gives 1 vote to every option
      count: reaction.count! - 1,
      index: emojiNameToIndex[reaction.name!],
    }));
  }

  async pinMessage(messageId: MessageId) {
    throwIfError(
      await this.#slack.client.pins.add({
        channel: settings.slackChannel,
        timestamp: messageId,
      })
    );
  }

  async postMessage({ notify, text }: PostMessageOptions) {
    const response = await this.#slack.client.chat.postMessage({
      channel: settings.slackChannel,
      text: notify ? `@here ${text}` : text,
    });

    // Slack keeps timestamps as equivalents to unique IDs for messages.
    // https://api.slack.com/messaging/retrieving#individual_messages
    const messageId = response.message?.ts;

    if (!messageId) {
      throw new Error(response.error ?? "Could not post message");
    }

    return messageId;
  }
}
