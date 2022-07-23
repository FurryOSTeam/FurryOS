const got = require("got");
const Discord = require('discord.js');

module.exports = {
    name: "otter",
    usage: "/otter",
    category: "Fun",
    description: "Shows a random image of an otter.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
    try {
      got('https://www.reddit.com/r/otters/random/.json').then(response => {
          let content = JSON.parse(response.body);
          let otterimage = content[0].data.children[0].data.url;
          let embed = new Discord.EmbedBuilder()
          embed.setTitle(`Otter 🦦`)
          embed.setImage(otterimage)
          embed.setTimestamp()
          embed.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          embed.setColor('#7F674F');
      interaction.reply({ embeds: [embed] });
    })
    } catch (err) {
      console.log(err);
    }
  }
}