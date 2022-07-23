const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "serverinfo",
    usage: "/serverinfo",
    category: "Info",
    description: "Displays info about the server.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
      let boosts = interaction.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 15) boostlevel = "2";
      if (boosts >= 30) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000;
        await interaction.reply({embeds: [new Discord.MessageEmbed()
        .setAuthor({ name: "Server Information About: " +  interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})
        .setColor(client.config.embedcolors.default)
        .addField("❱ Owner", `${interaction.guild.members.cache.get(interaction.guild.ownerId)}`, true)
        .addField("❱ Created On", "\`" + moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(interaction.guild.createdTimestamp).format("hh:mm:ss") +"`", true)
        .addField("❱ You Joined", "\`" + moment(interaction.member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(interaction.member.joinedTimestamp).format("hh:mm:ss") +"`", true)
      
        .addField("❱ All Channels", "👁‍🗨 \`" + interaction.guild.channels.cache.size + "\`", true)
        .addField("❱ Text Channels", "💬 \`" + interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_TEXT").size + "\`", true)
        .addField("❱ Voice Channels", "🔈 \`" + interaction.guild.channels.cache.filter((channel) => channel.type == "GUILD_VOICE").size + "\`", true)
       
        .addField("❱ Total USERS", "😀 \`" + interaction.guild.memberCount + "\`", true)
        .addField("❱ Total HUMANS", "👤 \`" + interaction.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("❱ Total BOTS", "🤖 \`" + interaction.guild.members.cache.filter(member => member.user.bot).size + "\`", true)

        .addField("❱ ONLINE", "🟢 \`" + interaction.guild.members.cache.filter((member) => member.presence && member.presence.status != "offline").size + "\`", true)
        .addField("❱ OFFLINE", "⚫ \`" + interaction.guild.members.cache.filter((member) => member.presence && member.presence.status == "offline").size + "\`", true)
        
        .addField("❱ Total Boosts", "\`" + interaction.guild.premiumSubscriptionCount + "\`", true)
        .addField("❱ Boost-Level", "\`" + boostlevel + "\`", true)
        .addField("❱ Max-Talk-Bitrate", "👾 \`" + maxbitrate + " kbps\`", true)
        
        .addField("❱ Total Emojis", "\`" + interaction.guild.emojis.cache.size + "\`", true)
        .addField("❱ Total Roles", "\`" + interaction.guild.roles.cache.size + "\`", true)
        .addField("❱ ID", `${interaction.guild.id}`, true)
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })]});
  }
}