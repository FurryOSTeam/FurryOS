const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
    name: "modaltest",
    usage: "/modaltest",
    category: "Info",
    description: "Shows the modal test.",
    ownerOnly: false,
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