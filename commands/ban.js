const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a person from the server.',
  	aliases: ['b', 'ban'],
  	usage: '<@user> or <id> | <reason>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
    if(!message.member.permissions.has('BAN_MEMBERS')) {
      message.channel.send("You do not have permission to ban someone! You need ban members on your role!");
    } else if(!args[0]){
      message.channel.send("You have to enter a user to ban.");
    } else if(!args[1]){
      message.channel.send("Enter a ban reason.");
    } else {
        const banned = await 
        message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const banner = message.author.tag;
        const reason = args[1];

        if(banned){
          if(!message.guild.member(banned).bannable) return message.channel.send("That user is not bannable.");

          await banned.ban();

          const embed = new MessageEmbed()
            .setColor(11098277)
            .setTitle(`Member banned by ${banner}`)
            .addField('Banned Member', `${banned}`, true)
            .addField('Server', `${message.guild.name}`, true)
            .setDescription(`**Reason:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: `© ${message.guild.me.displayName}`, iconURL: client.user.displayAvatarURL() });

          message.channel.send({ embeds: [embed] });
        } else{
            message.channel.send("Member not found.");
      }
    }
  }
}