const Yiffy = require("yiffy");
const y = new Yiffy();
const Discord = require('discord.js');

module.exports = {
    name: "yiffbulge",
    category: "NSFW",
    description: "Shows a furries bulge.",
    ownerOnly: false,
    run: async (client, interaction) => {
    if (interaction.channel.nsfw) {
     y.furry.bulge("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle('Furries Bulge!')
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
				.setFooter({ text: 'OwO', iconURL: interaction.user.displayAvatarURL() })
				.setTimestamp(new Date().toISOString())
				.setDescription([
					`[[ShortURL]](${json.shortURL})`,
					`[[ReportURL]](${json.reportURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[NoSource]` : `[[Source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor(client.config.embedcolors.default)
				.setImage(json.url)

      interaction.reply({ embeds: [fboop] });
    });
        } else {
        interaction.reply({ content: "This channel is SFW. Make it NSFW to see NSFW commands.", ephemeral: true });
      }
    }
};