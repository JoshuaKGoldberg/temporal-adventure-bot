// Todo: take in from cosmiconfig or similar
export const settings = {
  /**
   * Discord channel ID to post in.
   */
  discordChannel: "916936992237953064",

  /**
   * Slack channel ID to post in.
   */
  slackChannel: "C02MM315NPR",

  /**
   * How frequently to check for choice consensus.
   */
  interval: "1 day",

  /**
   * Ngrok server port to listen for server messages on.
   */
  port: 1238,

  /**
   * Temporal task queue to run execution in.
   */
  taskQueue: "adventure-bot",

  /**
   * Temporal Workflow ID to run execution under.
   */
  workflowId: "my-adventure-bot",
};
