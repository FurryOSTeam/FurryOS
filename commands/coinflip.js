const { MessageEmbed } = require('discord.js');
const { coinflip } = require('../utils/emojis.json');

module.exports = {
    name: 'coinflip',
    description: 'Flips a coin.',
  	aliases: ['cflip', 'coinflip'],
  	usage: '',
	category: 'Fun',
async execute(client, message, args, Discord){
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = 'heads';
    else result = 'tails';
    const embed = new MessageEmbed()
      .setTitle(`${coinflip}  Coinflip  ${coinflip}`)
      .setDescription(`I flipped a coin, ${message.member}. The result was **${result}**!`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    }
}