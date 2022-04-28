const Yiffy = require("yiffy");
const y = new Yiffy();

module.exports = {
    name: 'yiffbulge',
    description: "Shows a furries bulge.",
  	aliases: ['yiffbulge', 'yiffb'],
  	usage: '',
	  category: 'Yiff',
async execute(client, message, args, Discord){
    if (message.author.bot) return false;
    if (message.channel.nsfw) {
     y.furry.bulge("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle('Furries Bulge!')
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setFooter("OwO", message.author.displayAvatarURL())
				.setTimestamp(new Date().toISOString())
				.setDescription([
					`[[ShortURL]](${json.shortURL})`,
					`[[ReportURL]](${json.reportURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[NoSource]` : `[[Source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor('#0099ff')
				.setImage(json.url)

      message.channel.send(fboop);
      

    });

        } else {
        message.channel.send("This channel is SFW. Make it NSFW to see NSFW commands.");
      }

    }
};