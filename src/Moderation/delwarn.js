const mongo = require('../../handlers/mongo')
const warnSchema = require('../../handlers/warnSchema')

const Discord = require('discord.js');

module.exports = {
    name: "delwarn",
    usage: "/delwarn <user> <id>",
    category: "Moderation",
    description: "Deletes a warn from a user.",
    ownerOnly: false,
    options: [
      {
          name: "user",
          description: "User with the warn.",
          type: 'USER',
          required: true
      },
      {
          name: "id",
          description: "Id of the warn.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    const guild = interaction.guild.id
    if(!interaction.member.permissions.has("KICK_MEMBERS")) {
      await interaction.reply({ content: "You do not have permission to delete someones warn! You need kick members on your role!", ephemeral: true }); return
    }

      await mongo().then(async (mongoose) => {
        try{
           await warnSchema.findOneAndUpdate({ guildId: guild }, { $pull: { "warnings": { "warnID": interaction.options.getString("id") } }}, { safe: true, multi:true }, function(err, obj) {})
         await interaction.reply({ embeds: [new Discord.MessageEmbed()
            .setColor(client.config.embedcolors.success)
            .setTitle(`✅ Deleted warning!`)
            .setTimestamp()
            .setFooter({ text: 'FurryOS'})]})
          mongoose.connection.close()
        }catch(err){
          await interaction.reply({ embeds: [new Discord.MessageEmbed()
            .setColor(client.config.embedcolors.error)
            .setTitle(`❌ This warning does not exist!`)
            .setTimestamp()
            .setFooter({ text: 'FurryOS'})]})
          console.log(err)
          }
       })
    }
}