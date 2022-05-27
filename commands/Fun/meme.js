const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "meme",
    category: "Fun",
    description: "Shows memes!",
    ownerOnly: false,
    run: async (client, interaction) => {
    fetch('https://meme-api.herokuapp.com/gimme')
    .then(res => res.json())
    .then(json => {
      const memeEmbed = new Discord.MessageEmbed()
      .setColor(client.config.embedcolors.default)
      .setTitle(json.title)
      .setDescription('Here is your meme!')
      .setImage(json.url)
      .setFooter({ text: `${json.subreddit} ${json.postLink}` });

      interaction.reply({ embeds: [memeEmbed] });
    });
  }
}