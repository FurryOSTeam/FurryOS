const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'owoify',
    description: 'Owoifys a message.',
  	aliases: ['owo', 'owoify'],
  	usage: '<message>',
	  category: 'Fun',
async execute(client, message, args, Discord){
    if (!args[0]) return message.reply("You need to input a sentence to OwOify")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/owoify?text=" + args.join('%20'));
    message.channel.send(body.owo)
  }
};