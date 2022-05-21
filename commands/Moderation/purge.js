module.exports = {
    name: 'purge',
    description: 'Purges messages.',
  	aliases: ['purge'],
  	usage: '<# of messages>',
	  category: 'Moderation',
async execute(client, message, args, Discord){
  if (message.member.permissions.has("MANAGE_MESSAGES")) {
        if(!args[0]) return message.reply('You forgot to include a number!');
        message.channel.bulkDelete(args[0]);
        } else {
            message.channel.send('You do not have permission to use this command! You need manage messages on your role!')
     }
  }
}