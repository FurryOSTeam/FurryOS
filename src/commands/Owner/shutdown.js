const Discord = require('discord.js');

module.exports = {
    name: "shutdown",
    usage: "/shutdown",
    category: "Owner",
    description: "Shuts down the bot.",
    ownerOnly: true,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    await interaction.reply(`Shutting down...`)
    process.exit();
	}
}