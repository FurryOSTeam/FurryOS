const Discord = require('discord.js');

module.exports = {
    name: "1984",
    usage: "/1984 <user>",
    category: "Owner",
    description: "1984s a user.",
    ownerOnly: false,
    type: "SUB_COMMAND",
    options: [
        {
            name: "type",
            description: "1984s a user.",
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction) => {
        console.log("amongus");
        await interaction.reply("Among Us");
	}
}