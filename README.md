# Temporal Adventure Bot

A sample [temporal.io](https://temporal.io) application that posts a daily Discord or Slack message for interactive choose-your-own-adventure stories. ✨

## Usage

You can use this bot integrated with Discord, Slack, or (todo) Twitter.
Regardless of which platform integration you intend on using:

- Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/docs/server/quick-install)).
- `npm install` to install dependencies.

You'll need to create an `.env` file containing exactly one of:

- `SOCIAL_PLATFORM=discord`
- `SOCIAL_PLATFORM=slack`

### Usage: Discord

1. Follow [Discord Bot Tokens](#discord-bot-tokens) below if you haven't yet
1. Put your `DISCORD_BOT_TOKEN` into `.env`
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow.
1. On your Discord application's Settings > OAuth2 > General (`https://discord.com/developers/applications/*/oauth2/general`), copy the ngrok URL logged by the workflow into a Redirects URL and save
1. On your Discord application's Settings > OAuth2 > URL Generator (`https://discord.com/developers/applications/*/oauth2/url-generator`), create and go through the flow of a URL with check the scopes:
   - Bots
     - Add Reactions
     - Create Messages
     - Manage Messages
     - Mention Everyone
   - Guilds

#### Discord Bot Tokens

1. Create an app on [Discord Developers > Applications](https://discord.com/developers/applications) with a name like `Choose Your Own Adventure Bot`
1. Under Application > Bot (`https://discord.com/developers/applications/*/bot`), click Add Bot
1. Enable the _Message Content Intent_ toggle and save
1. Grab the bot token from that page

### Usage: Slack

1. Follow [Slack Bot Tokens](#slack-bot-tokens) below if you haven't yet
1. Put your `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET` into `.env`
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow.
1. Modify your Slack app manifest to include a slash command under `features`, using the ngrok URL logged by the workflow for `url`:

   ```yml
   features:
     slash_commands:
       - command: /force
         description: "Force an adventure choice: 'random' or a number for an option."
         usage_hint: "0"
         url: https://<your-unique-address>.ngrok.io
   ```

#### Slack Bot Tokens

1. Create a new app using either flow on [Slack API > Apps > New App](https://api.slack.com/apps?new_app)
   - Give it at least the following bot permissions:
     - `channels:read`
     - `chat:write.public`
     - `chat:write`
     - `commands`
     - `pins:write`
     - `reactions:read`
     - `reactions:write`
1. Install it on your Slack workspace
1. Grab its Bot OAuth token from Settings > OAuth & Permissions (`https://api.slack.com/apps/*/oauth`)

## Temporal

See [temporal.io](https://temporal.io) for general information and [docs.temporal.io](https://docs.temporal.io) for developer documentation.

This project is based off the default [Hello World project](https://docs.temporal.io/docs/typescript/hello-world/) that is scaffolded out when you run `npx @temporalio/create@latest`.
