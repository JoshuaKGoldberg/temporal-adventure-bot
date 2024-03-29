# Temporal Adventure Bot

A sample [temporal.io](https://temporal.io) application that posts a daily Discord or Slack message for interactive choose-your-own-adventure stories. ✨

## YouTube Walkthrough

Watch Josh walkthrough the codebase in this video!

<a href="https://youtu.be/hGIhc6m2keQ">
   <img height=150 src="https://i9.ytimg.com/vi/hGIhc6m2keQ/mq3.jpg?sqp=CIi-8Y4G&rs=AOn4CLCuw9EjW5qXKG_1Kd_Whkr_QsZsnw" alt="tutorial video">
</a>

## Usage

You can use this bot integrated with Discord, Slack, or _(coming soon!)_ Twitter.
Regardless of which platform integration you intend on using:

- Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/docs/server/quick-install)).
- `npm install` to install dependencies.

You'll need to create an `.env` file containing exactly one of:

- `SOCIAL_PLATFORM=discord`
- `SOCIAL_PLATFORM=slack`

### Usage: Discord

1. Follow [Discord Bot Tokens](#discord-bot-tokens) below if you haven't yet
1. Put your `DISCORD_BOT_TOKEN` and `DISCORD_CHANNEL` into `.env`
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
   - applications.commands

#### Discord Bot Tokens

1. Create an app on [Discord Developers > Applications](https://discord.com/developers/applications) with a name like `Choose Your Own Adventure Bot`
1. Under Application > Bot (`https://discord.com/developers/applications/*/bot`), click Add Bot
1. Enable the _Message Content Intent_ toggle and save
1. Grab the bot token from that page

### Usage: Slack

1. Follow [Slack Bot Tokens](#slack-bot-tokens) below if you haven't yet
1. Put your `SLACK_BOT_TOKEN`, `SLACK_CHANNEL`, and `SLACK_SIGNING_SECRET` into `.env`
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow.
1. Modify your Slack app manifest to include a slash command under `features`, using the ngrok URL logged by the workflow for `url`:

   ```yml
   features:
     slash_commands:
       - command: /force
         description: "Force an adventure choice: 'random' or a number for an option."
         usage_hint: "1"
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

## Architecture

### Temporal

See [temporal.io](https://temporal.io) for general information and [docs.temporal.io](https://docs.temporal.io) for developer documentation.

This project is based off the default [Hello World project](https://docs.temporal.io/docs/typescript/hello-world/) that is scaffolded out when you run `npx @temporalio/create@latest`.

### Overview

#### Worker

The Temporal worker is set up in `src/worker.ts`.
It uses two common Temporal patterns:

- **Dependency Injection**: using the integration object created by `createIntegration` to provide APIs for the social platform being targeted (`Discord` or `Slack`) (see [Platforms](#platforms))
- **Logging Sinks**: providing a `logger.sink` method for the workflows to log out to `console.log`

#### Workflows

The client in `src/client.ts` will ask Temporal to run two different workflows:

1. **`instructions`**: Posts instructions to the social platform and pins the message
2. **`runGame`**: Continuously runs the game state until the game is finished

##### `runGame`

Each iteration of the game (so, daily), `runGame` goes through these steps:

1. If the entry has no options, the game is over
2. Post the current entry as a poll
3. Check and remind people to vote once a day until either...
   - ...a choice is made by consensus
   - ...an admin forces a choice
4. If the choice was forced by an admin, mention that
5. Continue with that chosen next step in the game

#### Platforms

The `platformFactory` function used in both workers and workflows reads from `process.env` to return the `createIntegration` and `createServer` methods for the social platform being targeted.

##### Integrations

`createIntegration`: creates the client API used to send messages to the social platform.
For example, the Slack integration uses the [Slack Bolt SDK](https://slack.dev/bolt-js).

#### Servers

`createServer` creates the (generally Express) server that runs locally and receives webhook events from the social platform.
Both the Discord and Slack servers use Ngrok to expose a local port on the public web, so that a `/force` command configured on the platform sends a message, it can signal to the workflow.
