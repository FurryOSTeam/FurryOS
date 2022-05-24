const Discord = require('discord.js');

module.exports = {
    name: "exit",
    category: "Image",
    description: "Creates the exit car meme.",
    ownerOnly: false,
    options: [
      {
          name: "text-1",
          description: "Message on the left side of the sign.",
          type: 'STRING',
          required: true
      },
      {
          name: "text-2",
          description: "Message on the right side of the sign.",
          type: 'STRING',
          required: true
      },
      {
          name: "text-3",
          description: "Message on the car.",
          type: 'STRING',
          required: true
      },
  ],
    run: async (client, interaction) => {
    let memetext1 = interaction.options.getString("text-1").replace(/[^\w\s]|_/g,"");
    let memetext2 = interaction.options.getString("text-2").replace(/[^\w\s]|_/g,"");
    let memetext3 = interaction.options.getString("text-3").replace(/[^\w\s]|_/g,"");
    
    await interaction.reply({
      files: [
        {
          attachment: `https://api.memegen.link/images/exit/${memetext1}/${memetext2}/${memetext3}`,
          name: "exitmeme.png",
        },
      ],
    });
	}
}