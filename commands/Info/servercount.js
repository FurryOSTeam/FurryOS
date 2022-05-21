const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const Discord = require("discord.js")

module.exports = {
    name: "servercount",
    category: "Info",
    description: "Displays the number of servers the bot is in.",
    ownerOnly: false,
    run: async (client, interaction) => {
    const counts = stripIndent`
        Servers :: ${client.guilds.cache.size}
    `;
    const embed = new MessageEmbed()
      .setTitle('FurryOS\'s Server Count')
      .setDescription(stripIndent`\`\`\`AsciiDoc\n${counts}\`\`\``)
      .setTimestamp()
      .setColor(interaction.guild.me.displayHexColor);
    await interaction.reply({ embeds: [embed] });
  }
};

// Users   :: ${client.user.cache.size}