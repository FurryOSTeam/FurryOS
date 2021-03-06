const Discord = require('discord.js');

module.exports = {
    name: "globalavatar",
    usage: "/globalavatar <user>",
    category: "Fun",
    description: "Shows a persons global discord avatar.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'User to get their profile picture of.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        }
    ],
    run: async (client, interaction) => {
    const user = interaction.options.getUser("user")

    const embed = new Discord.EmbedBuilder()
      .setTitle(`${user.username}'s Global Avatar`)
      .setColor(client.config.embedcolors.default)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
      .setTimestamp()
      .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
    await interaction.reply({ embeds: [embed] });
  }
}