const Discord = require('discord.js');
const path = require('path');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: 'Shows memes!',
  	aliases: ['meme'],
  	usage: '',
	  category: 'Fun',
async execute(client, message, args, Discord){
      if (message.author.bot) return false;
      fetch('https://meme-api.herokuapp.com/gimme')
    .then(res => res.json())
    .then(json => {
      const memeEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(json.title)
      .setDescription('Here is your meme!')
      .setImage(json.url)
      .setFooter(`${json.subreddit} ${json.postLink}`);

      message.channel.send(memeEmbed);

    });

    }
}