declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_BOT_TOKEN: string;
    DISCORD_CHANNEL: string;
    NGROK_AUTHTOKEN: string;
    NGROK_DOMAIN?: string;
    SLACK_BOT_TOKEN: string;
    SLACK_CHANNEL: string;
    SLACK_SIGNING_SECRET: string;
  }
}
