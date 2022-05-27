const discord = require("discord.js");

module.exports = {
    name: "roll",
    category: "Fun",
    description: "Rolls a dice.",
    ownerOnly: false,
    run: async (client, interaction) => {
    let roll = Math.floor(Math.random() * 6) + 1;

    await interaction.reply("rolled a " + roll);
  }
}