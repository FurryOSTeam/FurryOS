const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Shows the uptime of the bot.',
  	aliases: ['uptime', 'up'],
  	usage: '',
	  category: 'Info',
async execute(client, message, args, Discord){

  const time = require('ms')
  const uptime = time(client.uptime)
  message.channel.send({embeds: [{
    color: 39423,
    description: `The bot has been up for ${uptime}.`,
    footer: {
      text: client.user.username,
      icon_url: client.user.displayAvatarURL()
    },
    timestamp: new Date()
  }]})
  }
}