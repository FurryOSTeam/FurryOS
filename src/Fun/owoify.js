const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "owoify",
    usage: "/owoify <message>",
    category: "Fun",
    description: "Owoifys a message.",
    ownerOnly: false,
    options: [
        {
            name: 'message',
            description: 'Message you want to owoify.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
    const targetmessage = interaction.options.getString("message").replace(/[^\w\s]|_/g,"")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/owoify?text=" + targetmessage);
    await interaction.reply(body.owo)
  }
};