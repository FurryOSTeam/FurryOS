const Discord = require('discord.js');

module.exports = {
    name: "eval",
    usage: "/eval <code>",
    category: "Owner",
    description: "Runs code on the bot.",
    ownerOnly: true,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "code",
          description: "Code to run.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      }
  ],
    run: async (client, interaction) => {
    try {
        let code = interaction.options.getString("code");
        let evaled = eval(code);
        if(typeof evaled != "string") {
            evaled = require("util").inspect(evaled);
        }
    } catch (err) {
        return await interaction.reply({embeds: [ new Discord.EmbedBuilder()
            .setColor(client.config.embedcolors.error)
            .setDescription(`**Error:**\n` + `\`There was an error while compiling your code: ${err}\``)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setAuthor( { name: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            ]});
        }
	}
}