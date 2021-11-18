const Discord = require('discord.js');
const path = require('path');
const fetch = require('node-fetch');
//const yiffy = require('../Yiffy');
//const { JSONResponse } = require("yiffy")
const Yiffy = require("yiffy");
const y = new Yiffy();

module.exports = {
    name: 'boop',
    description: 'Shows a picture of a furry booping a snoot!',
  	aliases: ['boop'],
  	usage: '',
	  category: 'Furry Images',
async execute(client, message, args, Discord){
    if (message.author.bot) return false;
     y.furry.boop("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle('Boop!')
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setFooter("OwO", message.author.displayAvatarURL())
				.setTimestamp(new Date().toISOString())
				.setDescription([
					`[[shortURL]](${json.shortURL})`,
					`[[reportURL]](${json.reportURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[noSource]` : `[[source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor('#0099ff')
				.setImage(json.url)

      message.channel.send(fboop);

    });

    }
}