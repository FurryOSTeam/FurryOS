module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot.',
  	aliases: ['shutdown'],
  	usage: '',
	  category: 'Owner',
async execute(client, message, args, Discord){
    await message.channel.send(`Shutting down...`)
    process.exit();
  }
}