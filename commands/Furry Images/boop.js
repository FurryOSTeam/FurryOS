const Yiffy = require("yiffy");
const y = new Yiffy();
const Discord = require('discord.js');

module.exports = {
    name: "boop",
    category: "Furry Images",
    description: "Shows a picture of a furry booping a snoot!",
    ownerOnly: false,
    run: async (client, interaction) => {
    y.furry.boop("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle('Boop!')
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
				.setFooter({ text: 'OwO', iconURL: interaction.user.displayAvatarURL() })
				.setTimestamp(new Date().toISOString())
				.setDescription([
					`[[shortURL]](${json.shortURL})`,
					`[[reportURL]](${json.reportURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[noSource]` : `[[source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor('#0099ff')
				.setImage(json.url)

      interaction.reply({ embeds: [fboop] });
    });
	}
}