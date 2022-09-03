const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("send help"),
  async execute(interaction, client) {
    const newMessage = `
    \`\`\`
    Hi, I am T. Bernard
    There're a lot of functions I can do:
    /volume shape
    /area shape
    /calculate number
    /ping
    /help
    /calculate_area shape value1 value2
    /calculate_surface_area shape value1 value2 value3
    /calculate_volume shape value1 value2 value3
    \`\`\`
    ^ is replace with **
    `;
    interaction.reply(newMessage);
  },
};
