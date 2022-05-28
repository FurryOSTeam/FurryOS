const Discord = require('discord.js');

module.exports = {
    name: "shutdown",
    usage: "/shutdown",
    category: "Owner",
    description: "Shuts down the bot.",
    ownerOnly: true,
    run: async (client, interaction) => {
    await interaction.reply(`Shutting down...`)
    process.exit();
	}
}