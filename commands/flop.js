const Yiffy = require("yiffy");
const y = new Yiffy();

module.exports = {
    name: 'flop',
    description: 'Furry flop!',
  	aliases: ['flop'],
  	usage: '',
	  category: 'Furry Images',
async execute(client, message, args, Discord){
    if (message.author.bot) return false;
     y.furry.flop("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle('FLOP!')
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setFooter("OwO", message.author.displayAvatarURL())
				.setTimestamp(new Date().toISOString())
				.setDescription([
					`[[shortURL]](${json.shortURL})`,
					`[[reportURL]](${json.reportURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[noSource]` : `[[source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor('#0099ff')
				.setImage(json.url)

      message.channel.send(fboop);

    });

    }
}