const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const endpointRetriever = require("./singleton/endpoints");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beast")
    .setDescription("Displays Runescape beast information.")
    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription("Beast identification number.")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    await fetch(
      endpointRetriever.getBeastUrl(interaction.options.getInteger("id"))
    )
      .then(async (response) => {
        console.log(response.headers.get("Content-Length"));
        if (response.ok && response.data.length > 0) {
          response.json().then(async (beastData) => {
            const beastEmbed = new EmbedBuilder()
              .setColor("FFFFFF")
              .setTitle(`${beastData.name}`)
              .setDescription(`${beastData.description}`)
              .addFields(
                { name: "Areas", value: `${beastData.areas.join("\n")}` },
                {
                  name: "Combat Level",
                  value: `${beastData.level}`,
                  inline: true,
                },
                {
                  name: "Experience",
                  value: `${beastData.level}`,
                  inline: true,
                },
                { name: "Magic", value: `${beastData.magic}`, inline: true },
                {
                  name: "Defence",
                  value: `${beastData.defence}`,
                  inline: true,
                },
                { name: "Ranged", value: `${beastData.ranged}`, inline: true },
                { name: "Attack", value: `${beastData.attack}`, inline: true }
              )
              .addFields(
                {
                  name: "Poisonous",
                  value: `${beastData.poisonous}`,
                  inline: true,
                },
                {
                  name: "Weakness",
                  value: `${beastData.weakness}`,
                  inline: true,
                },
                { name: "Size", value: `${beastData.size}`, inline: true },
                {
                  name: "Members",
                  value: `${beastData.members}`,
                  inline: true,
                },
                {
                  name: "Lifepoints",
                  value: `${beastData.lifepoints}`,
                  inline: true,
                },
                {
                  name: "Aggressive",
                  value: `${beastData.aggressive}`,
                  inline: true,
                }
              )
              .setTimestamp()
              .setFooter({
                text: "Developed by Sinan",
                iconURL: endpointRetriever.getRunescapeLogoUrl(),
              });

            await interaction.editReply({
              embeds: [beastEmbed],
            });
          });
        } else if (response.data.length === 0) {
          await interaction.editReply("Beast ID does not exist");
        }
      })
      .catch((error) => console.log(error));
  },
};
