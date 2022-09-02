const { SlashCommandBuilder } = require("discord.js");

const formula = {
  volume_circle: "π ˣ r²",
  volume_cylinder: "π ˣ r² ˣ h",
  volume_pyramid: "⅓ ˣ π ˣ r² ˣ h",
  volume_prism: "l ˣ w ˣ h",
  volume_sphere: "4/3 ˣ π ˣ r³"
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("example : /volume prism")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("All the volume formula T. Bernard has taught us")
        .setRequired(true)
        .addChoices(
          { name: "sphere", value: "volume_sphere" },
          { name: "cylinder", value: "volume_cylinder" },
          { name: "pyramid", value: "volume_pyramid" },
          { name: "prism", value: "volume_prism" }
        )
    ),

  async execute(interaction, client) {
    const input = interaction.options.get("category").value;

    const newMessage = "`" + formula[input] + "`";

    interaction.reply(`The volume of ${input.split("_")[1]} is ${newMessage}`);
  },
};
