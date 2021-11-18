const mongo = require('../mongo')
const warnSchema = require('../models/warnSchema')

const Discord = require('discord.js');

module.exports = {
    name: 'delwarn',
    description: 'Deletes a warn from a user.',
  	aliases: ['delwarn'],
  	usage: '<user> <id>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
    if (!args[0]) return message.reply("Use shorkhelp to see how to delete someones warn right.");
    const guild = message.guild.id
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      message.channel.send("You do not have permission to delete someones warn! You need kick members on your role!"); return
    }

      await mongo().then(async (mongoose) => {
        try{
           await warnSchema.findOneAndUpdate({ guildId: guild }, { $pull: { "warnings": { "warnID": args[0] } }}, { safe: true, multi:true }, function(err, obj) {})
         message.channel.send(new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`✅ Deleted warning!`)
        .setTimestamp()
        .setFooter('FurryOS'))
          mongoose.connection.close()
      }catch(err){
        message.channel.send(new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`❌ This warning does not exist!`)
        .setTimestamp()
        .setFooter('FurryOS'))
        console.log(err)
      }
       })
    }
}