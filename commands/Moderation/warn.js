const mongo = require('../../handlers/mongo')
const warnSchema = require('../../handlers/warnSchema')
const { v4: uuidv4 } = require('uuid');

const Discord = require('discord.js');

module.exports = {
    name: "warn",
    category: "Moderation",
    description: "Warns a user.",
    ownerOnly: false,
    options: [
      {
          name: "user",
          description: "User to warn.",
          type: 'USER',
          required: true
      },
      {
          name: "reason",
          description: "Reason for the warn.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    const target = interaction.options.getUser("user");
    if(!interaction.member.permissions.has("KICK_MEMBERS")) {
      await interaction.reply({ content: "You do not have permission to warn someone! You need kick members on your role!", ephemeral: true }); return
    }

    const guildId = interaction.guild.id
    const userId = target.id
    const reason = interaction.options.getString("reason")

    const warning = {
      author: interaction.member.user.tag,
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
        await interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`✅ Warned user! || ${reason}`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS' })]})
        mongoose.connection.close()
      }
    })
  }
}