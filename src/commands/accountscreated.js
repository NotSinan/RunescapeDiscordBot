const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const endpointRetriever = require("./singleton/endpoints");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accountscreated")
    .setDescription("Displays total number of RuneScape accounts created."),

  async execute(interaction) {
    const data = await fetch(endpointRetriever.getAccountCreatedUrl()).then(
      (response) => response.json()
    );

    const accountsCreatedEmbed = new EmbedBuilder()
      .setTitle("RuneScape Accounts Created")
      .setDescription("The total RuneScape accounts created is: ")
      .setColor("FFFFFF")
      .setImage(endpointRetriever.getAccountCreatedUrl())
      .addFields({ name: "Accounts", value: `${data.accountsformatted}` })
      .setTimestamp()
      .setFooter({
        text: "Developed by Sinan",
        iconURL: endpointRetriever.getRunescapeLogoUrl(),
      });

    await interaction.reply({ embeds: [accountsCreatedEmbed] });
  },
};
