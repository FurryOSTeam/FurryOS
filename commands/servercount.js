const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const Discord = require("discord.js")

module.exports = {
    name: 'servercount',
    description: 'Displays the number of servers the bot is in.',
  	aliases: ['servercount', 'servers'],
  	usage: '',
	  category: 'Info',
async execute(client, message, args, Discord){    const counts = stripIndent`
      Servers :: ${client.guilds.cache.size}
    `;
    const embed = new MessageEmbed()
      .setTitle('FurryOS\'s Server Count')
      .setDescription(stripIndent`\`\`\`AsciiDoc\n${counts}\`\`\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};

// Users   :: ${client.user.cache.size}