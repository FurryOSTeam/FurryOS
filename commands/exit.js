const Discord = require('discord.js');

module.exports = {
    name: 'exit',
    description: 'Creates the exit car meme.',
  	aliases: ['exit'],
  	usage: '<car> <left sign> <right sign>',
	  category: 'Image',
async execute(client, message, args, Discord){
    const memetext1 = args[0];
    if (!memetext1) {
      return message.channel.send("Enter the text to be placed on the car!");
    }
    const memetext2 = args[1];
    if (!memetext2) {
      return message.channel.send("Enter the text to be placed at left side of the sign!");
    }
    const memetext3 = args[2];
    if (!memetext3) {
      return message.channel.send("Enter the text to be placed at the right side of the sign!");
    }
    message.channel.send({
      files: [
        {
          attachment: `https://api.memegen.link/images/exit/${memetext1}/${memetext2}/${memetext3}`,
          name: "exitmeme.png",
        },
      ],
    });
	}
}