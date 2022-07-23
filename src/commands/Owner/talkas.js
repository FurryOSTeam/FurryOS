const Discord = require('discord.js');

module.exports = {
    name: "talkas",
    usage: "/talkas <message> <channel>",
    category: "Owner",
    description: "Talks as the bot.",
    ownerOnly: true,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: "message",
            description: "Message to send.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "channel",
            description: "Channel to send the message to.",
            type: Discord.ApplicationCommandOptionType.Channel,
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
            interaction.reply({ content: "Error sending message. " + err, ephemeral: true });
        }
	}
}