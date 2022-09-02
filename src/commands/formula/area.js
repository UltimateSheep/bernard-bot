const { SlashCommandBuilder } = require("discord.js");

const formula = {
  area_square: "w²",
  area_triangle: "½ ˣ b ˣ h",
  area_rectangle: "2 ˣ a + 2 ˣ b",
  area_circle: "2 ˣ π ˣ r",
  area_cylinder: "(2 ˣ π ˣ r) ˣ h ˣ 2 ˣ (π ˣ r²)",
  area_pyramid: "4 ˣ (½ ˣ h ˣ b) ˣ b²",
  area_tripyramid: "3 ˣ (½ ˣ h ˣ b) + (½ ˣ h₂ ˣ b) ",
  area_prism: "2 ˣ (h ˣ w) ˣ 2 ˣ (h ˣ l) ˣ 2 ˣ (w ˣ l)",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("area")
    .setDescription("example : /area square")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("All the area formula T. Bernard has taught us")
        .setRequired(true)
        .addChoices(
          { name: "square", value: "area_square" },
          { name: "triangle", value: "area_triangle" },
          { name: "rectangle", value: "area_rectangle" },
          { name: "circle", value: "area_circle" },
          { name: "cylinder", value: "area_cylinder" },
          { name: "pyramid", value: "area_pyramid" },
          { name: "Triangular Pyramid", value: "area_tripyramid" },
          { name: "prism", value: "area_prism" }
        )
    ),

  async execute(interaction, client) {
    const input = interaction.options.get("category").value;

    const newMessage = "`" + formula[input] + "`";

    interaction.reply(`The area of ${input.split("_")[1]} is ${newMessage}`);
  },
};
