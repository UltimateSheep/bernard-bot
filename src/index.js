
const keepAlive = require("./server")
require("dotenv").config();

const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  ActivityType,
  REST,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [
    Partials.Message,
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
  ],
});

client.commands = new Collection();
client.commandArray = [];
const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
  const files = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of files) require(`./functions/${folder}/${file}`)(client);
}

client.on("ready", () => {
  console.log(`Bernard class is coming with homework of ${client.user.tag}`);
  client.user.setActivity("The Organic Chemistry Tutor", {
    type: ActivityType.Watching,
  });

  client.user.setStatus("idle");
});


client.handleEvents();
client.handleCommands(client);

client.login(token);
keepAlive()