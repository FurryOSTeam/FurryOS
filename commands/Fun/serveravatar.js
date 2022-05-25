const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "serveravatar",
    category: "Fun",
    description: "Shows a persons server discord avatar.",
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
    
    let res = await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.token}`
        }
    })

    if(res.data.avatar !== undefined && res.data.avatar !== null) {
      function getImageEnding(base) {
        return `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${res.data.avatar}.${base}`
      }
        const embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s Server Avatar`)
          .setColor('BLUE')
          .setImage(getImageEnding(webp))
          .setDescription(`[Png](${getImageEnding(png)}) | [Webp](${getImageEnding(webp)}) | [Jpg](${getImageEnding(jpg)})`)
          .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply("This user has no avatar set.")
    }
  }
}