const Discord = require('discord.js');

module.exports = {
    name: "talkas",
    usage: "/talkas <message> <channel>",
    category: "Owner",
    description: "Talks as the bot.",
    ownerOnly: true,
    options: [
        {
            name: "message",
            description: "Message to send.",
            type: 'STRING',
            required: true
        },
        {
            name: "channel",
            description: "Channel to send the message to.",
            type: 'CHANNEL',
            required: true
        }
    ],
    run: async (client, interaction) => {
        let message = interaction.options.getString("message");
        let channel = interaction.options.getChannel("channel");
        
        try {
            await channel.send(message);
            interaction.reply({ content: "Sent.", ephemeral: true });
        } catch (err) {
            interaction.reply({ content: "Error sending message.", ephemeral: true });
        }
	}
}