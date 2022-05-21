const Discord = require('discord.js');

module.exports = {
    name: "purge",
    category: "Moderation",
    description: "Purges messages.",
    ownerOnly: false,
    options: [
      {
          name: "number",
          description: "Number of messages to delete.",
          type: 'NUMBER',
          required: true
      }
  ],
    run: async (client, interaction) => {
    if (interaction.user.permissions.has("MANAGE_MESSAGES")) {
        let numberofmessages = interaction.options.getNumber("number");
        message.channel.bulkDelete(numberofmessages);
        } else {
          await interaction.reply({ content: 'You do not have permission to use this command! You need manage messages on your role!', ephemeral: true })
     }
	}
}