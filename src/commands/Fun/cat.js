const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "cat",
    usage: "/cat",
    category: "Fun",
    description: "Sends an image of a cat!",
    ownerOnly: false,
    run: async (client, interaction) => {
      const res = await fetch('https://some-random-api.ml/animal/cat/');
      const img = (await res.json()).image;
      const embed = new MessageEmbed()
        .setTitle('🦊  C A T  🦊')
        .setImage(img)
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor('#6b6969');
      await interaction.reply({ embeds: [embed] });
  }
};