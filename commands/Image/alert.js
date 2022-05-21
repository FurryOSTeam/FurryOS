const Discord = require('discord.js');

module.exports = {
    name: 'alert',
    description: 'Funny meme phone alert.',
  	aliases: ['alert'],
  	usage: '<message>',
	  category: 'Image',
async execute(client, message, args, Discord){
    if (!args[0]) {
      return message.channel.send(`Add a message to the command!`)
    }
    let alertMessage = args.slice(0).join(' ');
    if (alertMessage.length > 65) return message.channel.send('**You Are Not Allowed To Go Over 65 Characters!**');

    message.channel.send({ files: [{ attachment: `https://api.popcatdev.repl.co/alert?text=${alertMessage}`, name: 'alert.jpg' }] });
	}
}