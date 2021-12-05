// Todo: take in from cosmiconfig or similar
export const settings = {
  /**
   * Slack channel ID to post in.
   */
  channel: "C02MM315NPR",

  /**
   * How frequently to check for choice consensus.
   */
  interval: "1 day",

  /**
   * Ngrok server port to listen for Slack POSTs on.
   */
  port: 1237,

  /**
   * Temporal task queue to run execution in.
   */
  taskQueue: "slack-adventure-bot",

  /**
   * Temporal Workflow ID to run execution under.
   */
  workflowId: "temporal-slack-adventure-bot",
};
