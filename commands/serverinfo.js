const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: 'serverinfo',
  description: 'Displays info about the server.',
  aliases: ['serverinfo', 'guild'],
  usage: '',
  category: 'Info',
async execute(client, message, args, Discord){
      let boosts = message.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 15) boostlevel = "2";
      if (boosts >= 30) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000;
        message.channel.send({embeds: [new Discord.MessageEmbed()
        .setAuthor({ name: "Server Information About: " +  message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setColor('#3498db')
        .addField("❱ Owner", `${message.guild.members.cache.get(message.guild.ownerId)}`, true)
        .addField("❱ Created On", "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.guild.createdTimestamp).format("hh:mm:ss") +"`", true)
        .addField("❱ You Joined", "\`" + moment(message.member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.member.joinedTimestamp).format("hh:mm:ss") +"`", true)
      
        .addField("❱ All Channels", "👁‍🗨 \`" + message.guild.channels.cache.size + "\`", true)
        .addField("❱ Text Channels", "💬 \`" + message.guild.channels.cache.filter((channel) => channel.type == "GUILD_TEXT").size + "\`", true)
        .addField("❱ Voice Channels", "🔈 \`" + message.guild.channels.cache.filter((channel) => channel.type == "GUILD_VOICE").size + "\`", true)
       
        .addField("❱ Total USERS", "😀 \`" + message.guild.memberCount + "\`", true)
        .addField("❱ Total HUMANS", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("❱ Total BOTS", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)

        .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter((member) => member.presence && member.presence.status != "offline").size + "\`", true)
        .addField("❱ OFFLINE", "⚫ \`" + message.guild.members.cache.filter((member) => member.presence && member.presence.status == "offline").size + "\`", true)
        
        .addField("❱ Total Boosts", "\`" + message.guild.premiumSubscriptionCount + "\`", true)
        .addField("❱ Boost-Level", "\`" + boostlevel + "\`", true)
        .addField("❱ Max-Talk-Bitrate", "👾 \`" + maxbitrate + " kbps\`", true)
        
        .addField("❱ Total Emojis", "\`" + message.guild.emojis.cache.size + "\`", true)
        .addField("❱ Total Roles", "\`" + message.guild.roles.cache.size + "\`", true)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setFooter({ text: "ID: " + message.guild.id, iconURL: message.guild.iconURL({dynamic: true})})]});
  }
}