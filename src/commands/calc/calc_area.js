const { SlashCommandBuilder } = require("discord.js");

const calc_formula = {
  area_square: function (a, b) {
    return a ** 2;
  },
  area_triangle: function (a, b) {
    return (1 / 2) * a * b;
  },
  area_rectangle: function (a, b) {
    return a * b;
  },
  area_circle: function (a, b) {
    return Math.PI * a ** 2;
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate_area")
    .setDescription("example: /calcualte_area square 5 5")
    .addStringOption((option) =>
      option
        .setName("shape")
        .setDescription("All the area formula T. Bernard has taught us")
        .setRequired(true)
        .addChoices(
          { name: "square", value: "area_square" },
          { name: "rectangle", value: "area_rectangle" },
          { name: "triangle", value: "area_triangle" },
          { name: "circle", value: "area_circle" }
        )
    )
    .addNumberOption((option) =>
      option
        .setName("value1")
        .setDescription("height/length/radius")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("value2")
        .setDescription(
          "width/base (if you selected square/circle just put in any number)"
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const input = interaction.options.get("shape").value;
    const value1 = interaction.options.get("value1").value;
    const value2 = interaction.options.get("value2").value;

    const calculation = calc_formula[input](value1, value2);

    interaction.reply(`*${input}* = ${"`" + Math.round((calculation + Number.EPSILON) * 100) / 100 + "`"}`);
  },
};
