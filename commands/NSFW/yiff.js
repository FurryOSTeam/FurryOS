const Yiffy = require("yiffy");
const y = new Yiffy();


module.exports = {
    name: 'yiff',
    description: "Shows yiff that you pick.",
  	aliases: ['yiff'],
  	usage: '<gay, straight, lesbian>',
	  category: 'Yiff',
async execute(client, message, args, Discord){
    if (message.author.bot) return false;
    if (message.channel.nsfw) {
      const query = args[0].toLowerCase()
      try{
     y.furry.yiff[query]("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle(`${query.charAt(0).toUpperCase() + query.slice(1)} yiff!`)
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
      }catch(err){
        return message.channel.send(`${args[0]} is not a valid yiff parameter.`)
      }
        } else {
        message.channel.send("This channel is SFW. Make it NSFW to see NSFW commands.");
      }

    }
};