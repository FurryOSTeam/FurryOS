module.exports = {
    name: 'interactionCreate',
    
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error check console' });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== client.config.ownerID) {
                return interaction.reply({ content: "This command only for the bot owner!", ephemeral: true });
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