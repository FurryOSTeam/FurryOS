const Discord = require('discord.js');

module.exports = {
    name: "bigbrain",
    usage: "/bigbrain <text 1> <text 2> <text 3> <text 4>",
    category: "Image",
    description: "Creates the big brain meme.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "text-1",
          description: "Text on first box.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      },
      {
          name: "text-2",
          description: "Text on second box.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      },
      {
          name: "text-3",
          description: "Text on third box.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      },
      {
          name: "text-4",
          description: "Text on fourth box.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      }
  ],
    run: async (client, interaction) => {
    let memetext1 = interaction.options.getString("text-1").replace(/[^\w\s]|_/g,"");
    let memetext2 = interaction.options.getString("text-2").replace(/[^\w\s]|_/g,"");
    let memetext3 = interaction.options.getString("text-3").replace(/[^\w\s]|_/g,"");
    let memetext4 = interaction.options.getString("text-4").replace(/[^\w\s]|_/g,"");
      
    await interaction.reply({
      files: [
        {
          attachment: `https://api.memegen.link/images/gb/${memetext1}/${memetext2}/${memetext3}/${memetext4}`,
          name: "brainmeme.png",
        },
      ],
    });
	}
}