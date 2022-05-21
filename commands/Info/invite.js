const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = {
    name: 'invite',
    description: 'Gives an invite for the support server and an invite for the bot.',
  	aliases: ['invite'],
  	usage: '',
	  category: 'Info',
async execute(client, message, args, Discord){
    const embed = new MessageEmbed()
      .setTitle('Invite Me')
      .setThumbnail('https://i.ibb.co/FJ7ftHW/shork-512x512.jpg')
      .setDescription(oneLine`
        Click [here](https://discord.com/api/oauth2/authorize?client_id=840765753983762434&permissions=8&scope=bot)
        to invite me to your server!
      `)
      .addField('Other Links', 
        '**[Support Server](https://discord.gg/pD2QwAqdMY)**'
      )
      .addField('Support Services',
        //'+1 (786) 766-0258‬\n' +
        'furryos@bigbenster702.com'
      )
      .addField('Maintainers',
        'bigbenster702#1337'
      )
      .setFooter({ text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send({ embeds: [embed] });
  }
};