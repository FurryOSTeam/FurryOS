const Discord = require('discord.js');

module.exports = {
    name: "globalavatar",
    category: "Fun",
    description: "Shows a persons global discord avatar.",
    ownerOnly: false,
    options: [
        {
            name: 'user',
            description: 'User to get their profile picture of.',
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction) => {
    const user = interaction.options.getUser("user")

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.username}'s Global Avatar`)
      .setColor(client.config.embedcolors.default)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
      .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
    await interaction.reply({ embeds: [embed] });
  }
}