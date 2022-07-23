const Discord = require('discord.js');

module.exports = {
    name: "poll",
    usage: "/poll",
    category: "Info",
    description: "Creates a poll.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: "question",
            description: "The question of the poll.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const question = interaction.options.getString("question");
        if (question.length > 4096) return interaction.reply({ content: '**You Are Not Allowed To Go Over 4096 Characters!**', ephemeral: true });

        const embed = new Discord.EmbedBuilder()
        .setTitle("📊 Poll")
        .setDescription(question)
        .setColor(client.config.embedcolors.default)
        .setTimestamp()
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        //await interaction.reply({ content: `Poll sent! You may now dismiss this message.`, ephemeral: true });

        await interaction.reply({ embeds: [embed], fetchReply: true }).then(message => {
            message.react('👍');
            message.react('👎');
            message.react('😐');
        });
    }
}