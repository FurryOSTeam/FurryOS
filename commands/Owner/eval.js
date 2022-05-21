const Discord = require('discord.js');

module.exports = {
    name: "eval",
    category: "Owner",
    description: "Runs code on the bot.",
    ownerOnly: true,
    options: [
      {
          name: "code",
          description: "Code to run.",
          type: 'STRING',
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
        return await interaction.reply({embeds: [{
            color: 7948427,
            description: `**Error:**\n`
            + `\`There was an error while compiling your code: ${err}\``,
            author: {
                name: interaction.user.tag,
                icon_url: interaction.user.displayAvatarURL()
            }
        }]});
    }
	}
}