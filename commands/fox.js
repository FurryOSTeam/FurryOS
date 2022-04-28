const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'fox',
    description: 'Sends an image of a fox!',
  	aliases: ['fox'],
  	usage: '',
	  category: 'Fun',
async execute(client, message, args, Discord){
    try {
      const res = await fetch('https://randomfox.ca/floof/');
      const img = (await res.json()).image;
      const embed = new MessageEmbed()
        .setTitle('🦊  F O X  🦊')
        .setImage(img)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
  }
};