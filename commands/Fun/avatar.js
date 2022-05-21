const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Shows a persons discord avatar.',
  	aliases: ['avatar', 'av'],
  	usage: '<@theperson>',
	  category: 'Fun',
async execute(client, message, args, Discord){
  
  const mention =
        (await message.mentions.members.first()) ||
        (await message.guild.members.cache.get(args[0]));
  if(mention) {
    message.channel.send({embeds: [{
      title: 'Avatar',
      image: {
        url: mention.user.displayAvatarURL({ format: 'png', dynamic: true, size: 256 })
      },
      author: {
        name: mention.user.tag,
        icon_url: mention.user.displayAvatarURL()
      }
    }]})
  } else {
    if(args[0]) {
      const findname = await message.guild.members.fetch({ query: args[0], limit: 1 })
      if(findname.first()) {
        message.channel.send({embeds: [{
          title: 'Avatar',
          image: {
            url: findname.first().user.displayAvatarURL({ format: 'png', dynamic: true, size: 256 })
          },
          author: {
            name: findname.first().user.tag,
            icon_url: findname.first().user.displayAvatarURL()
          }
        }]})
      } else {
        message.channel.send({embeds: [{
          title: 'Avatar',
          image: {
            url: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 256 })
          },
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }]})
       } 
      } else {
        message.channel.send({embeds: [{
          title: 'Avatar',
          image: {
            url: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 256 })
          },
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }]})
    }
  }
  }
}