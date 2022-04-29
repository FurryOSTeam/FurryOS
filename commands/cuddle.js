const Yiffy = require("yiffy");
const y = new Yiffy();

module.exports = {
    name: 'cuddle',
    description: 'Furry cuddle!',
  	aliases: ['cuddle'],
  	usage: '',
	  category: 'Furry Images',
async execute(client, message, args, Discord){
    if (message.author.bot) return false;
     y.furry.cuddle("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle('Cuddle!')
				.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
				.setFooter({ text: 'OwO', iconURL: message.author.displayAvatarURL() })
				.setTimestamp(new Date().toISOString())
				.setDescription([
					`[[ShortURL]](${json.shortURL})`,
					`[[ReportURL]](${json.reportURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[NoSource]` : `[[Source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor('#0099ff')
				.setImage(json.url)

      message.channel.send({ embeds: [fboop] });
      

    });

    }
}