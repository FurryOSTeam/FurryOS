const Discord = require('discord.js');

module.exports = {
    name: 'dockofshame',
    description: 'Sends a user to the dock of shame.',
  	aliases: ['dos'],
  	usage: '<@user>',
	  category: 'Image',
async execute(client, message, args, Discord){
    const mention = message.mentions.members.first() || message.member;
    const avatar = mention.user.displayAvatarURL({ size: 2048, format: "png" });
  
    message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/dockofshame?user=${avatar}`, name: "dockofshame.png" }] });
	}
}