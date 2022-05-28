const Yiffy = require("yiffy");
const y = new Yiffy();
const Discord = require("discord.js");

module.exports = {
    name: "yiff",
    usage: "/yiff <gay, straight, or lesbian>",
    category: "NSFW",
    description: "Shows yiff that you pick.",
    ownerOnly: false,
    options: [
      {
          name: "type",
          description: "Sends the type of yiff. (gay, straight, or lesbian)",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    if (interaction.channel.nsfw) {
      let query = interaction.options.getString("type");
   try{
     y.furry.yiff[query]("json", 1)
    .then(json => {
      const fboop = new Discord.MessageEmbed()
        .setTitle(`${query.charAt(0).toUpperCase() + query.slice(1)} yiff!`)
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
      }catch(err){
        return interaction.reply({ content: `${query.charAt(0).toUpperCase() + query.slice(1)} is not a valid yiff parameter.`, ephemeral: true });
      }
        } else {
        interaction.reply({ content: "This channel is SFW. Make it NSFW to see NSFW commands.", ephemeral: true });
      }
    }
};