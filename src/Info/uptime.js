const Discord = require('discord.js');

module.exports = {
    name: "uptime",
    category: "Info",
    description: "Shows the uptime of the bot.",
    ownerOnly: false,
    run: async (client, interaction) => {
    const time = require('ms')
    const uptime = time(client.uptime)
    await interaction.reply({embeds: [{
      color: client.config.embedcolors.default,
      description: `The bot has been up for ${uptime}.`,
      footer: {
        text: client.user.username,
        icon_url: client.user.displayAvatarURL()
      },
      timestamp: new Date()
    }]})
  }
}