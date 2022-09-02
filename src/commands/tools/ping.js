const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return the pings"),
  async execute(interaction, client) {
    console.log("some one called me")
    const newMessage = "Thanks for calling me";
    interaction.reply(newMessage);
  },
};
