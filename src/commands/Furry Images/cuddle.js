const Yiffy = require("yiffy");
const y = new Yiffy({ apiKey: process.env.yiffykey });
const Discord = require('discord.js');

module.exports = {
    name: "cuddle",
    usage: "/cuddle",
    category: "Furry Images",
    description: "Furry cuddle!",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    y.furry.cuddle("json", 1)
    .then(json => {
      const fboop = new Discord.EmbedBuilder()
        .setTitle('Cuddle!')
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
				.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
				.setTimestamp()
				.setDescription([
					`[[shortURL]](${json.shortURL})`,
					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[noSource]` : `[[source]](${json.sources[0]})`}`
				].join("\n"))
				.setColor(client.config.embedcolors.default)
				.setImage(json.url)

      interaction.reply({ embeds: [fboop] });
    });
	}
}