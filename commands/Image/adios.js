const Discord = require('discord.js');

module.exports = {
    name: "adios",
    category: "Image",
    description: "Adios.",
    ownerOnly: false,
    options: [
      {
          name: "user",
          description: "User that leaves.",
          type: 'MENTIONABLE',
          required: true
      }
  ],
    run: async (client, interaction) => {
    let mention = interaction.options.getMentionable("user");
    const avatar = mention.user.displayAvatarURL({ format: "png" });

    await interaction.reply({ files: [{ attachment: `https://vacefron.nl/api/adios?user=${avatar}`, name: "adios.png" }] });
	}
}