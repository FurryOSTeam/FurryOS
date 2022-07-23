const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: "cat",
    usage: "/cat",
    category: "Fun",
    description: "Sends an image of a cat!",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
      const res = await fetch('https://some-random-api.ml/animal/cat/');
      const img = (await res.json()).image;
      const embed = new Discord.EmbedBuilder()
        .setTitle('🐈  C A T  😺')
        .setImage(img)
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor('#6b6969');
      await interaction.reply({ embeds: [embed] });
  }
};