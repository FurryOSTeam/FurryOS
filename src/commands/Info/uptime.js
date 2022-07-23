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

    const embed = new Discord.EmbedBuilder()
      .setColor(client.config.embedcolors.default)
      .setDescription(`The bot has been up for ${uptime}.`)
      .setTimestamp()
      .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setColor(client.config.embedcolors.default);

    await interaction.reply({embeds: [embed]});
  }
}