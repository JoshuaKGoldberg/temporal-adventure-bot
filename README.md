# Temporal Slack Adventure Bot

A sample [temporal.io](https://temporal.io/) application that posts a daily Slack messages for interactive choose-your-own-adventure stories. ✨

## Usage

1. Follow [Slack Bot Tokens](#slack-bot-tokens) below if you haven't yet
1. Create an `.env` with your `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET`
1. Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/docs/server/quick-install/)).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow.

### Slack Bot Tokens

1. Create a new app using either flow on [Slack API > Apps > New App](https://api.slack.com/apps?new_app)
   - Give it at least the following bot permissions:
     - `channels:read`
     - `chat:write.public`
     - `chat:write`
     - `pins:write`
     - `reactions:read`
     - `reactions:write`
1. Install it on your Slack workspace
1. Grab its Bot OAuth token from Settings > OAuth & Permissions (`https://api.slack.com/apps/*/oauth`)

## Temporal

See [temporal.io](https://temporal.io) for general information and [docs.temporal.io](https://docs.temporal.io) for developer documentation.

This project is based off the default [Hello World project](https://docs.temporal.io/docs/typescript/hello-world/) that is scaffolded out when you run `npx @temporalio/create@latest`.
