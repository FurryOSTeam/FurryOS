const Discord = require('discord.js');

module.exports = {
    name: 'modalSubmit',

    async execute(interaction, client) {
        client.on('modalSubmit', async (modal) => {
            if(modal.customId === 'test-modal') {
              const firstResponse = modal.getTextInputValue('textinput-customid');
                modal.reply({ embeds: [new Discord.MessageEmbed()
                    .setTitle('Modal Test.')
                    .setDescription(`Text: ${firstResponse}`)
                    .setTimestamp()
                    .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setColor(client.config.embedcolors.default)
                ]});
            }  
        });
    }
}