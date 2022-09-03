const { SlashCommandBuilder } = require("discord.js");

const calc_formula = {
  volume_sphere: function (r, b, c) {
    return (4 / 3) * Math.PI * r ** 3;
  },
  volume_cylinder: function (r, h, b) {
    return Math.PI * r ** 2 * h;
  },
  volume_pyramid: function (a, b, c) {
    return (1 / 3) * a * b * c;
  },
  volume_prism: function (a, b, c) {
    return a * b * c;
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate_volume")
    .setDescription("example: /calcualte_area  prism 5 5 5")
    .addStringOption((option) =>
      option
        .setName("shape")
        .setDescription("All the volume formula T. Bernard has taught us")
        .setRequired(true)
        .addChoices(
          { name: "prism", value: "volume_prism" },
          { name: "cylinder", value: "volume_cylinder" },
          { name: "pyramid", value: "volume_pyramid" },
          { name: "sphere", value: "volume_sphere" }
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
          "width/base (if you selected sphere just put in any number)"
        )
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("value3")
        .setDescription(
          "depth (if you selected sphere/cylinder just put in any number)"
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
