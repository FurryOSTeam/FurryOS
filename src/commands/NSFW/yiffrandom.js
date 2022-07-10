const Yiffy = require("yiffy");
const y = new Yiffy();
const Discord = require("discord.js");

module.exports = {
    name: "yiffrandom",
    usage: "/yiffrandom",
    category: "NSFW",
    description: "Shows random yiff.",
    ownerOnly: false,
    run: async (client, interaction) => {
    if (interaction.channel.nsfw) {

    let choices = ["gay", "straight", "lesbian"];

    let math = Math.floor((Math.random() * choices.length));

    let answer = choices[math]
    
    y.furry.yiff[answer]("json", 1)
    .then(json => {
      const yiff = new Discord.MessageEmbed()
        .setTitle(`${answer.charAt(0).toUpperCase() + answer.slice(1)} yiff!`)
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

             interaction.reply({ embeds: [yiff] })});
        } else {
        interaction.reply({ content: "This channel is SFW. Make it NSFW to see NSFW commands.", ephemeral: true });
      }
    }
};