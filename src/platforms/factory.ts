/// <reference types="../typings/env" />

import * as dotenv from "dotenv";

import { DiscordIntegration } from "./discord/integration";
import { createDiscordExpressServer } from "./discord/server";
import { SlackIntegration } from "./slack/integration";
import { createSlackExpressServer } from "./slack/server";

dotenv.config();

export const platformFactory = () => {
  const platform = process.env.SOCIAL_PLATFORM;

  switch (platform) {
    case "discord":
      return {
        createIntegration: DiscordIntegration.create,
        createServer: createDiscordExpressServer,
      };

    case "slack":
      return {
        createIntegration: SlackIntegration.create,
        createServer: createSlackExpressServer,
      };

    default:
      throw new Error(`Unknown SOCIAL_PLATFORM: ${platform}`);
  }
};
