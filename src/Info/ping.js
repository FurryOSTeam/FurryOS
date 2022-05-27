const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    category: "Info",
    description: "Shows the ping of the bot.",
    ownerOnly: false,
    run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setDescription('`Pinging...`')
      .setColor(client.config.embedcolors.default);    
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    const timestamp = (interaction.editedTimestamp) ? interaction.editedTimestamp : interaction.createdTimestamp;
    const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
    const apiLatency = `\`\`\`ini\n[ ${Math.round(interaction.client.ws.ping)}ms ]\`\`\``;
    embed.setTitle(`Pong! 🏓`)
      .setDescription('')
      .addField('Latency', latency, true)
      .addField('API Latency', apiLatency, true)
      .setTimestamp();
    msg.edit({ embeds: [embed] });
  }
}