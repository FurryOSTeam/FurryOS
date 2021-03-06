const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    usage: "/8ball <question>",
    category: "Fun",
    description: "A magic 8 ball for you to ask questions to.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "question",
          description: "A magic 8 ball for you to ask questions to.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      }
  ],
    run: async (client, interaction) => {
  
		  let question = interaction.options.getString("question");

		  let replies = ["Yes.", "No.", "Ask again later.", "Maybe.", "Yes and definitely.", "It is certain.", "As I see it, yes.", "Very doubtful.", "Eh I will say yes to that.", "NO!", "Never.", "Nope."];

		  let result = Math.floor((Math.random() * replies.length));

		  let ballembed = new Discord.EmbedBuilder()
		  	.setAuthor({ name: interaction.user.tag})
		  	.setColor(client.config.embedcolors.default)
        .addFields([
            { name: "Question", value: question },
            { name: "Answer", value: replies[result]}
        ])
        .setTimestamp()
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

		  await interaction.reply({ embeds: [ballembed] })
	}
}