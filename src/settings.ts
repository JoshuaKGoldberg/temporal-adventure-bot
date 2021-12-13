export const settings = {
  /**
   * How frequently to post and check for choice consensus.
   */
  interval: "1 day",

  /**
   * Ngrok server port to listen for server messages on.
   */
  port: 1234,

  /**
   * Temporal task queue to run execution in.
   */
  taskQueue: "adventure-bot",

  /**
   * Temporal Workflow ID to run execution under.
   */
  workflowId: "my-adventure-bot",
};
