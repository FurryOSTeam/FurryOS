const { oneLine } = require('common-tags');
const Discord = require('discord.js');

module.exports = {
    name: "invite",
    usage: "/invite",
    category: "Info",
    description: "Gives an invite for the support server and an invite for the bot.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    const embed = new Discord.EmbedBuilder()
      .setTitle('Invite Me')
      .setThumbnail('https://i.ibb.co/FJ7ftHW/shork-512x512.jpg')
      .setDescription(oneLine`
        Click [here](https://discord.com/api/oauth2/authorize?client_id=840765753983762434&permissions=1376909651062&scope=bot%20applications.commands)
        to invite me to your server!
      `)
      .addFields([
        { name: 'Other Links', value: '**[Support Server](https://discord.gg/pD2QwAqdMY)**' },
        { name: 'Support Services', value: 'furryos@bigbenster702.com' },
        { name: 'Maintainers', value: 'bigbenster702#1337' }
      ])
      .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(client.config.embedcolors.default);
    await interaction.reply({ embeds: [embed] });
  }
};