const mongo = require('../../handlers/mongo')
const warnSchema = require('../../handlers/warnSchema')

const Discord = require('discord.js');

module.exports = {
    name: "warnings",
    usage: "/warnings <user>",
    category: "Moderation",
    description: "Shows warnings for a user.",
    ownerOnly: false,
    options: [
      {
          name: "user",
          description: "User to show the warnings of.",
          type: 'USER',
          required: true
      }
  ],
    run: async (client, interaction) => {
    const target = interaction.options.getUser("user");
    if(!interaction.member.permissions.has("KICK_MEMBERS")) {
      await interaction.reply({ content: "You do not have permission to see someones warnings! You need kick members on your role!", ephemeral: true }); return
    }

    const guildId = interaction.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {
      try {
        const isempty = await warnSchema.findOne({ "warnings": { $exists: true, $not: {$size: 0} } });
        const results = await warnSchema.findOne({
          guildId,
          userId,
        })
        if(!results || isempty === null) return await interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor(client.config.embedcolors.error)
        .setTitle(`No warnings found`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS' })]})
       
        let reply = new Discord.MessageEmbed()
        .setColor(client.config.embedcolors.default)
        .setTitle(`Warnings for: ${userId}`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS' })
        
        for (const warning of results.warnings) {
          const { author, timestamp, reason, warnID } = warning

          reply .addFields({ name: `Warning - ${warnID}`, value: `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}" \n\n`})
        }

        await interaction.reply({ embeds: [reply] })
      } finally {
        mongoose.connection.close()
      }
    })
  },
}