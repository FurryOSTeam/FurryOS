const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "poll",
    usage: "/poll",
    category: "Info",
    description: "Creates a poll.",
    ownerOnly: false,
    options: [
        {
            name: "question",
            description: "The question of the poll.",
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const question = interaction.options.getString("question");

        const embed = new MessageEmbed()
        .setTitle("📊 Poll")
        .setDescription(question);

        await interaction.reply({ embeds: [embed] }).then(msg => {
            msg.react('👍');
            msg.react('👎');
        });
  }
}