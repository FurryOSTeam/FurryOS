const Discord = require('discord.js');

module.exports = {
    name: "alert",
    usage: "/alert <message>",
    category: "Image",
    description: "Funny meme phone alert.",
    ownerOnly: false,
    options: [
      {
          name: "message",
          description: "Message on phone.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    let alertMessage = interaction.options.getString("message").replace(/[^\w\s]|_/g,"");
    if (alertMessage.length > 65) return interaction.reply({ content: '**You Are Not Allowed To Go Over 65 Characters!**', ephemeral: true });

    await interaction.reply({ files: [{ attachment: `https://api.popcatdev.repl.co/alert?text=${alertMessage}`, name: 'alert.jpg' }] });
	}
}