const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "dog",
    usage: "/dog",
    category: "Fun",
    description: "Sends an image of a dog!",
    ownerOnly: false,
    run: async (client, interaction) => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random/');
      const img = (await res.json()).message;
      const embed = new MessageEmbed()
        .setTitle('🐶  D O G  🐕')
        .setImage(img)
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor(client.config.embedcolors.warning);
      await interaction.reply({ embeds: [embed] });
  }
};