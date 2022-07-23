const Discord = require('discord.js');

module.exports = {
    name: "womanyellingatcat",
    usage: "/womanyellingatcat <user> <user>",
    category: "Image",
    description: "Sends a picture of a woman yelling at a cat.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "user-woman",
          description: "User to use as the woman.",
          type: Discord.ApplicationCommandOptionType.Mentionable,
          required: true
      },
      {
        name: "user-cat",
        description: "User to use as the cat.",
        type: Discord.ApplicationCommandOptionType.Mentionable,
        required: true
    }
  ],
    run: async (client, interaction) => {
    let mention = interaction.options.getMentionable("user-woman");
    const avatar = mention.user.displayAvatarURL({ size: 2048, format: "png" });
    let mention2 = interaction.options.getMentionable("user-cat");
    const avatar2 = mention2.user.displayAvatarURL({ size: 2048, format: "png" });

    await interaction.reply({ files: [{ attachment: `https://vacefron.nl/api/womanyellingatcat?woman=${avatar}&cat=${avatar2}`, name: "womanyellingatcat.png" }] });
	}
}