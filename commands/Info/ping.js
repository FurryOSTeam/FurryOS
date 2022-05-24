const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: "ping",
    category: "Info",
    description: "Shows the ping of the bot.",
    ownerOnly: false,
    run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setDescription('`Pinging...`')
      .setColor(interaction.guild.me.displayHexColor);    
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    const timestamp = (interaction.editedTimestamp) ? interaction.editedTimestamp : interaction.createdTimestamp;
    const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
    const apiLatency = `\`\`\`ini\n[ ${Math.round(interaction.client.ws.ping)}ms ]\`\`\``;

    const currentNano = process.hrtime();
		await mongoose.connection.db.command({ ping: 1 });
		const time = process.hrtime(currentNano);
		const mongolat = (time[0] * 1e9 + time[1]) * 1e-6;
    const mongoLatency = `\`\`\`ini\n[ ${Math.round(mongolat)}ms ]\`\`\``;

    embed.setTitle(`Pong! 🏓`)
      .setDescription('')
      .addField('Latency', latency, true)
      .addField('API Latency', apiLatency, true)
      .addField('Mongo Latency', mongoLatency, true)
      .setTimestamp();
    msg.edit({ embeds: [embed] });
  }
}