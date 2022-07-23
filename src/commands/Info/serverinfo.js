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
        await interaction.reply({embeds: [new Discord.EmbedBuilder()
        .setAuthor({ name: "Server Information About: " +  interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})
        .setColor(client.config.embedcolors.default)
        .addFields([
          { name: "❱ Owner", value: `${interaction.guild.members.cache.get(interaction.guild.ownerId)}`, inline: true },
          { name: "❱ Created On", value: `\`${moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY")}\`\n\`${moment(interaction.guild.createdTimestamp).format("hh:mm:ss")}\``, inline: true },
          { name: "❱ You Joined", value: `\`${moment(interaction.member.joinedTimestamp).format("DD/MM/YYYY")}\`\n\`${moment(interaction.member.joinedTimestamp).format("hh:mm:ss")}\``, inline: true },

          { name: "❱ All Channels", value: "👁‍🗨 \`" + interaction.guild.channels.cache.size + "\`", inline: true },
          { name: "❱ Text Channels", value: "💬 \`" + interaction.guild.channels.cache.filter((channel) => channel.type == "GuildText").size + "\`", inline: true },
          { name: "❱ Voice Channels", value: "🔈 \`" + interaction.guild.channels.cache.filter((channel) => channel.type == "GuildVoice").size + "\`", inline: true },

          { name: "❱ Total USERS", value: "😀 \`" + interaction.guild.memberCount + "\`", inline: true },
          { name: "❱ Total HUMANS", value: "👤 \`" + interaction.guild.members.cache.filter(member => !member.user.bot).size + "\`", inline: true },
          { name: "❱ Total BOTS", value: "🤖 \`" + interaction.guild.members.cache.filter(member => member.user.bot).size + "\`", inline: true },

          { name: "❱ ONLINE", value: "🟢 \`" + interaction.guild.members.cache.filter((member) => member.presence && member.presence.status != "offline").size + "\`", inline: true },
          { name: "❱ OFFLINE", value: "⚫ \`" + interaction.guild.members.cache.filter((member) => member.presence && member.presence.status == "offline").size + "\`", inline: true },

          { name: "❱ Total Boosts", value: "\`" + interaction.guild.premiumSubscriptionCount + "\`", inline: true },
          { name: "❱ Boost-Level", value: "\`" + boostlevel + "\`", inline: true },
          { name: "❱ Max-Talk-Bitrate", value: "👾 \`" + maxbitrate + " kbps\`", inline: true },

          { name: "❱ Total Emojis", value: "\`" + interaction.guild.emojis.cache.size + "\`", inline: true },
          { name: "❱ Total Roles", value: "\`" + interaction.guild.roles.cache.size + "\`", inline: true },
          { name: "❱ ID", value: `${interaction.guild.id}`, inline: true }
        ])
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })]});
  }
}