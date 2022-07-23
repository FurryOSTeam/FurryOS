const Discord = require('discord.js');
const fetch = require('axios');

module.exports = {
    name: "serveravatar",
    usage: "/serveravatar <user>",
    category: "Fun",
    description: "Shows a persons server discord avatar.",
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
    const user = interaction.options.getUser("user");
    
    let res = await fetch.get(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.token}`
        }
    });

    if(res.data.avatar !== undefined && res.data.avatar !== null) {
      function getImageEnding(arg1) {
        return `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${res.data.avatar}.${arg1}`
      }
        const embed = new Discord.EmbedBuilder()
          .setTitle(`${user.username}'s Server Avatar`)
          .setColor(client.config.embedcolors.default)
          .setImage(getImageEnding(`webp`))
          .setDescription(`[Png](${getImageEnding(`png`)}) | [Webp](${getImageEnding(`webp`)}) | [Jpg](${getImageEnding(`jpg`)})`)
          .setTimestamp()
          .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new Discord.EmbedBuilder()
          .setTitle(`${user.username}'s Server Avatar`)
          .setColor(client.config.embedcolors.default)
          .setDescription(`This user has no server avatar.`)
          .setTimestamp()
          .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({ embeds: [embed] });
    }
  }
}