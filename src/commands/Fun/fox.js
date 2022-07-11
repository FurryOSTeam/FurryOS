const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "fox",
    usage: "/fox",
    category: "Fun",
    description: "Sends an image of a fox!",
    ownerOnly: false,
    run: async (client, interaction) => {
      const res = await fetch('https://randomfox.ca/floof/');
      const img = (await res.json()).image;
      const embed = new MessageEmbed()
        .setTitle('🦊  F O X  🦊')
        .setImage(img)
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor('#ffa500');
      await interaction.reply({ embeds: [embed] });
  }
};