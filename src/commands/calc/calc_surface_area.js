const { SlashCommandBuilder } = require("discord.js");

const calc_formula = {
  area_sphere: function (r, h, c) {
    return 4 * Math.PI * r ** 2;
  },
  area_cylinder: function (r, h, b) {
    return Math.PI * r * 2 * h + 2 * (Math.PI * r ** 2);
  },
  area_pyramid: function (h, b, c) {
    return (1 / 2) * b * h * 4 + b ** 2;
  },
  area_prism: function (h, b, d) {
    return 2 * (h * b) + 2 * (b * d) + 2 * (h * d);
  },
  area_square: function (a, b) {
    return a * 4;
  },
  area_rectangle: function (a, b) {
    return a * 2 + b * 2;
  },
  area_circle: function (a, b) {
    return Math.PI * a * 2;
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate_surface_area")
    .setDescription("example: /calculate_surface_area prism 5 5 5")
    .addStringOption((option) =>
      option
        .setName("shape")
        .setDescription("All the surface area formula T. Bernard has taught us")
        .setRequired(true)
        .addChoices(
          { name: "prism", value: "area_prism" },
          { name: "cylinder", value: "area_cylinder" },
          { name: "pyramid", value: "area_pyramid" },
          { name: "sphere", value: "area_sphere" },
          { name: "square", value: "area_square" },
          { name: "rectangle", value: "area_rectangle" },
          { name: "circle", value: "area_circle" }
        )
    )
    .addNumberOption((option) =>
      option
        .setName("value1")
        .setDescription("height/length/radius/perpendicular height")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("value2")
        .setDescription(
          "width/base (if you selected square/sphere just put in any number)"
        )
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("value3")
        .setDescription(
          "depth (if you selected sphere/cylinder/pyramid or 2d just put in any number)"
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const input = interaction.options.get("shape").value;
    const value1 = interaction.options.get("value1").value;
    const value2 = interaction.options.get("value2").value;
    const value3 = interaction.options.get("value3").value;

    const calculation = calc_formula[input](value1, value2, value3);

    interaction.reply(
      `*${input}* = ${
        "`" + Math.round((calculation + Number.EPSILON) * 100) / 100 + "`"
      }`
    );
  },
};
