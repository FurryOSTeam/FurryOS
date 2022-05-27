const Discord = require('discord.js');

module.exports = {
    name: "dockofshame",
    usage: "/dockofshame <user>",
    category: "Image",
    description: "Sends a user to the dock of shame.",
    ownerOnly: false,
    options: [
      {
          name: "user",
          description: "User to send.",
          type: 'MENTIONABLE',
          required: true
      }
  ],
    run: async (client, interaction) => {
    let mention = interaction.options.getMentionable("user");
    const avatar = mention.user.displayAvatarURL({ size: 2048, format: "png" });

    await interaction.reply({ files: [{ attachment: `https://vacefron.nl/api/dockofshame?user=${avatar}`, name: "dockofshame.png" }] });
	}
}