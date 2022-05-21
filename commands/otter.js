const { MessageEmbed } = require('discord.js');
const got = require("got");

module.exports = {
    name: 'otter',
    description: 'Shows a random image of an otter.',
  	aliases: [''],
  	usage: '',
	  category: 'Fun',
async execute(client, message, args, Discord){
    try {
      got('https://www.reddit.com/r/otters/random/.json').then(response => {
          let content = JSON.parse(response.body);
          let otterimage = content[0].data.children[0].data.url;
          let embed = new Discord.MessageEmbed()
          embed.setTitle(`Otter 🦦`)
          embed.setImage(otterimage)
          embed.setColor('#7F674F')
      message.channel.send({ embeds: [embed] });
    })
    } catch (err) {
      console.log(err);
    }
  }
}
