const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "fox",
    category: "Fun",
    description: "Sends an image of a fox!",
    ownerOnly: false,
    run: async (client, interaction) => {
      const res = await fetch('https://randomfox.ca/floof/');
      const img = (await res.json()).image;
      const embed = new MessageEmbed()
        .setTitle('🦊  F O X  🦊')
        .setImage(img)
        .setFooter({ text: interaction.member.displayName,  iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor(client.config.embedcolors.warning);
      await interaction.reply({ embeds: [embed] });
  }
};