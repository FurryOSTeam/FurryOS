module.exports = (Discord, client) => {
  var NotifyChannel = client.channels.cache.find(channel => channel.id === '860703550068490250');
  let guildjoin = new Discord.MessageEmbed()
		.setColor('YELLOW')
    .setTitle(`FurryOS is now in ${client.guilds.cache.size} servers!`)
    .setTimestamp()
    .setFooter('FurryOS');
		NotifyChannel.send(guildjoin)
}