const Discord = require('discord.js');

module.exports = {
    name: 'bigbrain',
    description: 'Creates the big brain meme.',
  	aliases: ['bigbrain'],
  	usage: '<x4 text | "/" = spaces Ex. one test/two test/three test test | Ex. cat/food car dog rat>',
	  category: 'Image',
async execute(client, message, args, Discord){
    const splitArgs = args.join(" ").split("/")
    const memetext1 = splitArgs[0];
    if (!memetext1) {
      return message.channel.send("Enter the text to be placed on the first image!");
    }
    const memetext2 = splitArgs[1];
    if (!memetext2) {
      return message.channel.send("Enter the text to be placed on the second image!");
    }
    const memetext3 = splitArgs[2];
    if (!memetext3) {
      return message.channel.send("Enter the text to be placed on the third image!");
    }
    const memetext4 = splitArgs[3];
    if (!memetext4) {
      return message.channel.send("Enter the text to be placed on the forth image!");
    }
    message.channel.send({
      files: [
        {
          attachment: `https://api.memegen.link/images/gb/${memetext1}/${memetext2}/${memetext3}/${memetext4}`,
          name: "brainmeme.png",
        },
      ],
    });
	}
}