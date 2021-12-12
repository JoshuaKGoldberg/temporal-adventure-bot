import * as discord from "discord.js";

export const getDiscordClient = async () => {
  const client = new discord.Client<true>({
    intents: [
      discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      discord.Intents.FLAGS.GUILD_MESSAGES,
      discord.Intents.FLAGS.GUILDS,
    ],
  });

  await client.login(process.env.DISCORD_BOT_TOKEN);

  return client;
};
