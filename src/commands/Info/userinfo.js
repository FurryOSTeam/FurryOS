const Discord = require("discord.js");
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
    name: "userinfo",
    usage: "/userinfo <user>",
    category: "Info",
    description: "Shows info about a user.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "user",
          description: "User to show info about.",
          type: Discord.ApplicationCommandOptionType.User,
          required: true
      }
  ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const embeduserinfo = new Discord.EmbedBuilder()
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
          .setAuthor({ name: "Information about: " + member.user.username + "#" + member.user.discriminator, iconURL: member.user.displayAvatarURL({ dynamic: true })})
          .addFields([
            { name: '**❱ Username:**', value: `<@${member.user.id}>\n\`${member.user.tag}\``, inline: true },
            { name: '**❱ ID:**', value: `\`${member.id}\``, inline: true },
            { name: '**❱ Avatar:**', value: `[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`, inline: true },
            { name: '**❱ Date Join DC:**', value: `\`${moment(member.user.createdTimestamp).format("DD/MM/YYYY")}\`\n\`${moment(member.user.createdTimestamp).format("hh:mm:ss")}\``, inline: true },
            { name: '**❱ Date Join Guild:**', value: `\`${moment(member.joinedTimestamp).format("DD/MM/YYYY")}\`\n\`${moment(member.joinedTimestamp).format("hh:mm:ss")}\``, inline: true },
            { name: '**❱ Flags:**', value: `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, inline: true },
            { name: '**❱ Highest Role:**', value: `${member.roles.highest.id === interaction.guild.id ? 'None' : member.roles.highest}`, inline: true },
            { name: '**❱ Is a Bot:**', value: `\`${member.user.bot ? "✔️" : "❌"}\``, inline: true },
            { name: '**❱ Permissions:**', value: `${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}` },
            { name: `❱ [${roles.cache.size}] Roles: `, value: roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None', inline: true }
          ])
          .setTimestamp()
          .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setColor(client.config.embedcolors.default)
        await interaction.reply({embeds: [embeduserinfo]})
  }
}