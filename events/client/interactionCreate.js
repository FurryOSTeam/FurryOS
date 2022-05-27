const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: [new Discord.MessageEmbed()
            .setColor(client.config.embedcolors.error)
            .setTitle(`Error.`)
            .setDescription(`Error check console or contact dev.`)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText})], ephemeral: true });
        
        if (command.ownerOnly) {
            if (!client.config.ownerID.includes(interaction.user.id)) {
                return interaction.reply({ content: [new Discord.MessageEmbed()
                    .setColor(client.config.embedcolors.error)
                    .setTitle(`Error.`)
                    .setDescription(`This command only for the bot owner!`)
                    .setTimestamp()
                    .setFooter({ text: client.config.embedfooterText})], ephemeral: true });
            }
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}