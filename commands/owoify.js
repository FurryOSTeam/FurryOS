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
    if (message.mentions.members.first()) return message.reply("You cannot OwOify a member.")
    const targetmessage = args.join(' ').replace(/[^\w\s]|_/g,"")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/owoify?text=" + targetmessage);
    if (!body.owo) return message.reply("Message cannot be empty!")
    message.channel.send(body.owo)
  }
};