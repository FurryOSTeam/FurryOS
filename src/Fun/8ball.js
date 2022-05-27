const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    category: "Fun",
    description: "A magic 8 ball for you to ask questions to.",
    ownerOnly: false,
    options: [
      {
          name: "question",
          description: "A magic 8 ball for you to ask questions to.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
  
		  let question = interaction.options.getString("question");

		  let replies = ["Yes.", "No.", "Ask again later.", "Maybe.", "Yes and definitely.", "It is certain.", "As I see it, yes.", "Very doubtful.", "Eh I will say yes to that.", "NO!", "Never.", "Nope."];

		  let result = Math.floor((Math.random() * replies.length));

		  let ballembed = new Discord.MessageEmbed()
		  	.setAuthor({ name: interaction.user.tag})
		  	.setColor(client.config.embedcolors.default)
		  	.addField("Question", question)
		  	.addField("Answer", replies[result]);

		  await interaction.reply({ embeds: [ballembed] })
	}
}