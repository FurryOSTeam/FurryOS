const ownerid = require('../../utils/config.json')

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot.',
  	aliases: ['shutdown'],
  	usage: '',
	  category: 'Owner',
async execute(client, message, args, Discord){
  if (!ownerid.Owner.includes(message.author.id)) {
      return message.channel.send(`You cannot use this command!`)
   }
    await message.channel.send(`Shutting down...`)
    process.exit();
  }
}