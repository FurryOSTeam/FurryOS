const mongo = require('../mongo')
const warnSchema = require('../models/warnSchema')
const { v4: uuidv4 } = require('uuid');

const Discord = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Warns a user.',
  	aliases: ['warn'],
  	usage: '<@user> <reason>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
    if (!args[0]) return message.reply("Use f!help to see how to warn someone right.");
    const target = message.mentions.users.first()
    if(!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send("You do not have permission to warn someone! You need kick members on your role!"); return
    }
    if (!target) {
      const target = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle(`❌ Please specify a user to warn!`)
          .setTimestamp()
          .setFooter({ text: 'FurryOS' })
      message.channel.send({ embeds: [target] })
      return
    }

    args.shift()

    const guildId = message.guild.id
    const userId = target.id
    const reason = args.join(' ')

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
      warnID: uuidv4()
    }

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        )
      } finally {
        const win = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`✅ Warned user! || ${reason}`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS' })
        message.channel.send({ embeds: [win] })
        mongoose.connection.close()
      }
    })
  }
}