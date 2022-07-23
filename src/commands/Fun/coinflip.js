const Discord = require('discord.js');

module.exports = {
    name: "coinflip",
    usage: "/coinflip",
    category: "Fun",
    description: "Flips a coin.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = 'heads';
    else result = 'tails';
    const embed = new Discord.EmbedBuilder()
      .setTitle(`🪙 Coinflip 🪙`)
      .setDescription(`I flipped a coin, ${interaction.member}. The result was **${result}**!`)
      .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(client.config.embedcolors.default);
    await interaction.reply({ embeds: [embed] });
    }
}