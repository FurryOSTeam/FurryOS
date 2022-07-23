const Discord = require('discord.js');

module.exports = {
    name: "exit",
    usage: "/exit <text 1> <text 2> <text 3>",
    category: "Image",
    description: "Creates the exit car meme.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "text-1",
          description: "Message on the left side of the sign.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      },
      {
          name: "text-2",
          description: "Message on the right side of the sign.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      },
      {
          name: "text-3",
          description: "Message on the car.",
          type: Discord.ApplicationCommandOptionType.String,
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