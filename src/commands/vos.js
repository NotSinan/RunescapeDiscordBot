const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const endpointRetriever = require("./singleton/endpoints");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vos")
    .setDescription("Display the current Voice of Seren."),

  async execute(interaction) {
    currentVos = await fetch(endpointRetriever.getVosUrl()).then((response) =>
      response.json()
    );

    const districtEmbed = new EmbedBuilder()
      .setTitle("Voice of Seren")
      .setDescription("The current Voice of Seren is active in...")
      .setColor("FFFFFF")
      .addFields(
        { name: "First district: ", value: `${currentVos.district1}` },
        { name: "Second district: ", value: `${currentVos.district2}` }
      )
      .setTimestamp()
      .setFooter({
        text: "Developed by Sinan",
        iconURL: endpointRetriever.getRunescapeLogoUrl(),
      });
    await interaction.reply({ embeds: [districtEmbed] });
  },
};
