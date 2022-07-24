const Discord = require('discord.js');

module.exports = {
    name: "ping",
    usage: "/ping",
    category: "Info",
    description: "Shows the ping of the bot.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    const embed = new Discord.EmbedBuilder()
      .setDescription('`Pinging...`')
      .setColor(client.config.embedcolors.default);    
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    const timestamp = (interaction.editedTimestamp) ? interaction.editedTimestamp : interaction.createdTimestamp;
    const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
    const apiLatency = `\`\`\`ini\n[ ${Math.round(interaction.client.ws.ping)}ms ]\`\`\``;
    embed.setTitle(`Pong! 🏓`)
      .setDescription(null)
      .addFields([
        { name: 'Latency', value: latency, inline: true },
        { name: 'API Latency', value: apiLatency, inline: true }
      ])
      .setTimestamp()
      .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
    msg.edit({ embeds: [embed] });
  }
}