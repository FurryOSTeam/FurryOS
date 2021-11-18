const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a person from the server.',
  	aliases: ['k', 'kick'],
  	usage: '<@user> or <id> | <reason>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
    if(!message.member.hasPermission('KICK_MEMBERS')) {
      message.channel.send("You do not have permission to kick someone! You need to have kick members on your role!");
    } else if(!args[0]){
      message.channel.send("You have to enter a user to kick.");
    } else if(!args[1]){
      message.channel.send("Enter a kick reason.");
    } else {
        const kicked = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const kicker = message.author.tag;
        const reason = args[1];
        if(kicked){
          if(!message.guild.member(kicked).kickable) return message.channel.send("That user is not kickable.");

          kicked.kick();

          const embed = new MessageEmbed()
            .setColor(11098277)
            .setTitle(`Member kicked by ${kicker}`)
            .addField('Kicked Member', `${kicked}`, true)
            .addField('Server', `${message.guild.name}`, true)
            .setDescription(`**Reason:** ${reason}`)
            .setTimestamp()
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

          message.channel.send(embed);
        } else{
          message.channel.send("Member not found.");
      }
    }
  }
}