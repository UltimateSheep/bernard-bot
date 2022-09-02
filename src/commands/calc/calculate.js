const { SlashCommandBuilder } = require("discord.js");

function evil(fn) {
  return new Function("return " + fn)();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate")
    .setDescription("example: 10*5")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to calculate (no space)")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const input = interaction.options.get("input").value;

    const newMessage = evil(input);

    interaction.reply(`*${input}* = ${"`" + newMessage.toString() + "`"}`);
  },
};
