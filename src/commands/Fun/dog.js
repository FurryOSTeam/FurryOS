const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: "dog",
    usage: "/dog",
    category: "Fun",
    description: "Sends an image of a dog!",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random/');
      const img = (await res.json()).message;
      const embed = new MessageEmbed()
        .setTitle('🐶  D O G  🐕')
        .setImage(img)
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor('#7a5130');
      await interaction.reply({ embeds: [embed] });
  }
};