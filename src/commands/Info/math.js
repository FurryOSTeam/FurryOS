const Discord = require('discord.js');

module.exports = {
    name: "math",
    usage: "/math",
    category: "Info",
    description: "Pulls up a calculator.",
    ownerOnly: false,
    run: async (client, interaction) => {
        await Calculator({
            message: interaction,
            embed: {
                title: 'Calculator',
                color: `${client.config.embedcolors.default}`,
                footer: `${client.config.embedfooterText}`,
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    }
}