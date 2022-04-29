module.exports = {
    name: 'canary',
    description: 'Sends the invite to the canary version of the bot',
  	aliases: ['canary'],
  	usage: '',
	  category: 'Info',
async execute(client, message, args, Discord){
     const canary = new Discord.MessageEmbed()
     .setColor('BLUE')
     .setTitle(`FurryOS Canary`)
     .setDescription(`The invite to canary version of FurryOS. **NOTE THAT THE CANARY VERSION OF FurryOS IS HIGHLY UNSTABLE DUE TO ONGOING TESTING EFFORTS. THE BOT WILL GO DOWN OFTEN. YOU HAVE BEEN WARNED.**`)
     .addFields(
       { name: 'Canary version invite', value: '[Click here to add the canary version of FurryOS](https://discord.com/api/oauth2/authorize?client_id=854912437135736883&permissions=8&scope=bot)' },
      )
    .setTimestamp()
    .setFooter({ text: 'FurryOS' });
    message.channel.send({ embeds: [canary] })
  }
}