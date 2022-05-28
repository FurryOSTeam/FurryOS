const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = {
    name: "invite",
    usage: "/invite",
    category: "Info",
    description: "Gives an invite for the support server and an invite for the bot.",
    ownerOnly: false,
    run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Invite Me')
      .setThumbnail('https://i.ibb.co/FJ7ftHW/shork-512x512.jpg')
      .setDescription(oneLine`
        Click [here](https://discord.com/api/oauth2/authorize?client_id=840765753983762434&permissions=1376909651062&scope=bot%20applications.commands)
        to invite me to your server!
      `)
      .addField('Other Links', 
        '**[Support Server](https://discord.gg/pD2QwAqdMY)**'
      )
      .addField('Support Services',
        //'+1 (786) 766-0258\n' +
        'furryos@bigbenster702.com'
      )
      .addField('Maintainers',
        'bigbenster702#1337'
      )
      .setFooter({ text: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(client.config.embedcolors.default);
    await interaction.reply({ embeds: [embed] });
  }
};