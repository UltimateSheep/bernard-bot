const { SlashCommandBuilder } = require("discord.js");
const {simplify, derivative} = require('mathjs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("simplify")
    .setDescription("example: (x^2 + 5)(x + 6)")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to calculate")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const input = interaction.options.get("input").value;

    const newMessage = simplify(input);

    interaction.reply(`*${input}* = ${"`" + newMessage.toString() + "`"}`);
  },
};
