const Yiffy = require("yiffy");
const y = new Yiffy({ apiKey: process.env.yiffykey });
const Discord = require('discord.js');

module.exports = {
    name: "yiffbulge",
    usage: "/yiffbulge",
    category: "NSFW",
    description: "Shows a furries bulge.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    if (interaction.channel.nsfw) {
     y.furry.bulge("json", 1)
    .then(json => {
      const fboop = new Discord.EmbedBuilder()
        .setTitle('Furries Bulge!')
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
				.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
				.setTimestamp()
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