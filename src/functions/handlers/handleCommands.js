const fs = require("fs");
const { Routes } = require("discord-api-types/v9");
const { REST } = require("discord.js");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolders = fs.readdirSync("./src/commands");
    for (const folder of commandsFolders) {
      const files = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of files) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`command = ${JSON.stringify(command)}`);
      }
    }

    const clientId = "1015233873635987537";
    const guildId = "1014154465579905195";

    const rest = new REST({version: "9"}).setToken(process.env.token)
    try {
      console.log("Refreshing app (/) commands.")

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray
      })

      console.log("Refreshed app (/) commands.")
    } catch (error) {
      console.error(error);
    }
  };
};
