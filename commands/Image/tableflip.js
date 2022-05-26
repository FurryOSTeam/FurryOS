const Discord = require('discord.js');

module.exports = {
    name: "tableflip",
    category: "Image",
    description: "Makes a user flip a table.",
    ownerOnly: false,
    options: [
      {
          name: "user",
          description: "User that flips a table.",
          type: 'MENTIONABLE',
          required: true
      }
  ],
    run: async (client, interaction) => {
    let mention = interaction.options.getMentionable("user");
    const avatar = mention.user.displayAvatarURL({ format: "png" });

    await interaction.reply({ files: [{ attachment: `https://vacefron.nl/api/tableflip?user=${avatar}`, name: "tableflip.png" }] });
	}
}