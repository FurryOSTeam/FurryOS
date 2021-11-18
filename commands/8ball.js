const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'A magic 8 ball for you to ask questions to.',
  	aliases: ['8ball', 'ball'],
  	usage: '<question>',
	  category: 'Fun',
async execute(client, message, args, Discord){

		if (!args[0]) return message.reply("Please ask a question!");

		let replies = ["Yes.", "No.", "Ask again later.", "Maybe.", "Yes and definitely.", "It is certain.", "As I see it, yes.", "Very doubtful.", "Eh I will say yes to that.", "NO!", "Never.", "Nope."];

		let result = Math.floor((Math.random() * replies.length));
		let question = args.slice(0).join(" ");

		let ballembed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag)
			.setColor("#FF9900")
			.addField("Question", question)
			.addField("Answer", replies[result]);

		message.channel.send(ballembed)
	}
}