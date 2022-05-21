const discord = require("discord.js");

module.exports = {
    name: 'roll',
    description: 'Rolls a dice.',
  	aliases: ['roll'],
  	usage: '',
	  category: 'Fun',
async execute(client, message, args, Discord){
    let roll = Math.floor(Math.random() * 6) + 1;

    message.reply("rolled a " + roll);
  }
}