declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_BOT_TOKEN: string;
    SLACK_BOT_TOKEN: string;
    SLACK_SIGNING_SECRET: string;
  }
}
