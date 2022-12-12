const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const endpointRetriever = require("./singleton/endpoints");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vos")
    .setDescription("Display the current Voice of Seren."),

  async execute(interaction) {
    await interaction.deferReply();
    await fetch(endpointRetriever.getVosUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get the data.");
        }
        return response.json();
      })
      .then(async (data) => {
        const districtEmbed = new EmbedBuilder()
          .setTitle("Voice of Seren")
          .setDescription("The current Voice of Seren is active in...")
          .setColor("FFFFFF")
          .addFields(
            { name: "First district: ", value: `${data.district1}` },
            { name: "Second district: ", value: `${data.district2}` }
          )
          .setTimestamp()
          .setFooter({
            text: "Developed by Sinan",
            iconURL: endpointRetriever.getRunescapeLogoUrl(),
          });

        await interaction.editReply({ embeds: [districtEmbed] });
      })
      .catch(async (e) => await interaction.editReply(`${e.message}`));
  },
};
