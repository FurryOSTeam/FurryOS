const mongo = require('../handlers/mongo')
const warnSchema = require('../handlers/warnSchema')

const Discord = require('discord.js');

module.exports = {
    name: 'delwarn',
    description: 'Deletes a warn from a user.',
  	aliases: ['delwarn'],
  	usage: '<@user> <id>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
    if (!args[0]) return message.reply(`Use ${config.prefix}help to see how to delete someones warn right.`);
    const guild = message.guild.id
    if(!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send("You do not have permission to delete someones warn! You need kick members on your role!"); return
    }

      await mongo().then(async (mongoose) => {
        try{
           await warnSchema.findOneAndUpdate({ guildId: guild }, { $pull: { "warnings": { "warnID": args[0] } }}, { safe: true, multi:true }, function(err, obj) {})
         message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`✅ Deleted warning!`)
            .setTimestamp()
            .setFooter({ text: 'FurryOS'})]})
          mongoose.connection.close()
        }catch(err){
          message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`❌ This warning does not exist!`)
            .setTimestamp()
            .setFooter({ text: 'FurryOS'})]})
          console.log(err)
          }
       })
    }
}