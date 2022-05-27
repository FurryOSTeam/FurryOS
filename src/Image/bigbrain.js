const Discord = require('discord.js');

module.exports = {
    name: "bigbrain",
    category: "Image",
    description: "Creates the big brain meme.",
    ownerOnly: false,
    options: [
      {
          name: "text-1",
          description: "Text on first box.",
          type: 'STRING',
          required: true
      },
      {
          name: "text-2",
          description: "Text on second box.",
          type: 'STRING',
          required: true
      },
      {
          name: "text-3",
          description: "Text on third box.",
          type: 'STRING',
          required: true
      },
      {
          name: "text-4",
          description: "Text on fourth box.",
          type: 'STRING',
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