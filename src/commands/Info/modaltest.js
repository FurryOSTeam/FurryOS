const { Modal, TextInputComponent, showModal } = require('discord-modals');
const Discord = require('discord.js');

module.exports = {
    name: "modaltest",
    usage: "/modaltest",
    category: "Info",
    description: "Shows the modal test.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    const modal = new Modal()
        .setCustomId('test-modal')
        .setTitle('Testing Modals!')
        .addComponents(
          new TextInputComponent()
          .setCustomId('textinput-customid')
          .setLabel('Some random text.')
          .setStyle('LONG')
          .setPlaceholder('Text here.')
          .setRequired(true)
        );

    showModal(modal, {
        client: client,
        interaction: interaction
    });
  }
}