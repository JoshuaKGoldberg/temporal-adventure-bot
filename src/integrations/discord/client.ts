import * as discord from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

export const getDiscordClient = async () => {
  const client = new discord.Client({
    intents: [
      discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      discord.Intents.FLAGS.GUILD_MESSAGES,
      discord.Intents.FLAGS.GUILDS,
    ],
  });

  await client.login(process.env.DISCORD_BOT_TOKEN);

  return client;
};
