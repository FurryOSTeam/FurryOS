const Discord = require('discord.js');

module.exports = {
    name: "purge",
    usage: "/purge <number>",
    category: "Moderation",
    description: "Purges messages.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "number",
          description: "Number of messages to delete.",
          type: Discord.ApplicationCommandOptionType.Number,
          required: true
      }
  ],
    run: async (client, interaction) => {
    if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
        let numberofmessages = interaction.options.getNumber("number");
        await interaction.channel.bulkDelete(numberofmessages, true);
        await interaction.reply({ content: `Deleted ${numberofmessages} messages.` })
        } else {
          await interaction.reply({ content: 'You do not have permission to use this command! You need manage messages on your role!', ephemeral: true })
     }
	}
}