const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    category: "Fun",
    description: "Shows a persons discord avatar.",
    ownerOnly: false,
    options: [
        {
            name: 'user',
            description: 'User to get their profile picture of.',
            type: 'USER',
            required: true
        },
        {
          name: 'server',
          description: 'Gets the users server avatar.',
          type: 'SUB_COMMAND',
          required: false
        },
        {
          name: 'global',
          description: 'Gets the users global avatar.',
          type: 'SUB_COMMAND',
          required: false
      }
    ],
    run: async (client, interaction) => {
    const user = interaction.options.getUser("user")
    const choice = interaction.options.getSubcommand("server") || interaction.options.getSubcommand("global")
    
    if(choice === "global") {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setColor('BLUE')
        //.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setImage(user.displayAvatarURL())
        .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
        .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
      await interaction.reply({ embeds: [embed] });
    } else if(choice === "server") {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setColor('BLUE')
        .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
        .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
      await interaction.reply({ embeds: [embed] });
    }
  }
}