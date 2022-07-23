const Discord = require("discord.js");

module.exports = {
    name: "roll",
    usage: "/roll",
    category: "Fun",
    description: "Rolls a dice.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    let roll = Math.floor(Math.random() * 6) + 1;

    await interaction.reply("rolled a " + roll);
  }
}