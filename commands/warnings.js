const mongo = require('../handlers/mongo')
const warnSchema = require('../handlers/warnSchema')

const Discord = require('discord.js');

module.exports = {
    name: 'warnings',
    description: 'Shows warnings for a user.',
  	aliases: ['warnings', 'warns'],
  	usage: '<@user>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
  if (!args[0]) return message.reply(`Use ${config.prefix}help to see how to see someones warnings right.`);
  const target = message.mentions.users.first()
    if(!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send("You do not have permission to see someones warnings! You need kick members on your role!"); return
    }
    if (!target) {
      message.channel.send({ embeds: [new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle(`❌ Please specify a user to load warnings!`)
      .setTimestamp()
      .setFooter({ text: 'FurryOS' })]})
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {
      try {
        const isempty = await warnSchema.findOne({ "warnings": { $exists: true, $not: {$size: 0} } });
        const results = await warnSchema.findOne({
          guildId,
          userId,
        })
        if(!results || isempty === null) return message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`No warnings found`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS' })]})
       
        let reply = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Warnings for: ${userId}`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS' })
        
        for (const warning of results.warnings) {
          const { author, timestamp, reason, warnID } = warning

          reply .addFields({ name: `Warning - ${warnID}`, value: `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}" \n\n`})
        }

        message.channel.send({ embeds: [reply] })
      } finally {
        mongoose.connection.close()
      }
    })
  },
}