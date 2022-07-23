const Discord = require('discord.js');

module.exports = {
    name: "adios",
    usage: "/adios <user>",
    category: "Image",
    description: "Adios.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "user",
          description: "User that leaves.",
          type: Discord.ApplicationCommandOptionType.Mentionable,
          required: true
      }
  ],
    run: async (client, interaction) => {
    let mention = interaction.options.getMentionable("user");
    const avatar = mention.user.displayAvatarURL({ format: "png" });

    await interaction.reply({ files: [{ attachment: `https://vacefron.nl/api/adios?user=${avatar}`, name: "adios.png" }] });
	}
}