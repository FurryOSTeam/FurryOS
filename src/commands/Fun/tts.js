const Discord = require('discord.js');

module.exports = {
    name: "tts",
    usage: "/tts <message>",
    category: "Fun",
    description: "Sends an mp3 of the message with the text-to-speech engine.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "message",
          description: "Message to convert to tts.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      }
  ],
    run: async (client, interaction) => {
    let ttsmessage = interaction.options.getString("message") //.replace(/[^\w\s]|_/g,"");
    if (ttsmessage.length > 1024) return interaction.reply({ content: '**You Are Not Allowed To Go Over 1024 Characters!**', ephemeral: true });

    await interaction.reply({ files: [{ attachment: `https://tts.cyzon.us/tts?text=${ttsmessage}`, name: 'tts.mp3' }] });
	}
}