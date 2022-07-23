const Discord = require('discord.js');

module.exports = {
    name: "uptime",
    usage: "/uptime",
    category: "Info",
    description: "Shows the uptime of the bot.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    const time = require('ms')
    const uptime = time(client.uptime)
    await interaction.reply({embeds: [{
      color: client.config.embedcolors.default,
      description: `The bot has been up for ${uptime}.`,
      footer: {
        text: client.config.embedfooterText,
        icon_url: client.user.displayAvatarURL({ dynamic: true })
      },
      timestamp: new Date()
    }]})
  }
}