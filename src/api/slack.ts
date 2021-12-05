import * as bolt from "@slack/bolt";
import * as dotenv from "dotenv";

dotenv.config();

export const slack = new bolt.App({
  logLevel: bolt.LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
