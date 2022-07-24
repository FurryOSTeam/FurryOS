const moment = require('moment');
const Discord = require('discord.js');

const permissions = {
    Administrator: 'Administrator',
    ViewAuditLog: 'View Audit Log',
    ViewGuildInsights: 'View Server Insights',
    ManageGuild: 'Manage Server',
    ManageRoles: 'Manage Roles',
    ManageChannels: 'Manage Channels',
    KickMembers: 'Kick Members',
    BanMembers: 'Ban Members',
    CreateInstantInvite: 'Create Invite',
    ChangeNickname: 'Change Nickname',
    ManageNicknames: 'Manage Nicknames',
    ManageEmojisAndStickers: 'Manage Emojis',
    ManageWebhooks: 'Manage Webhooks',
    ViewChannel: 'Read Text Channels & See Voice Channels',
    SendMessages: 'Send Messages',
    SendTTSMessages: 'Send TTS Messages',
    ManageMessages: 'Manage Messages',
    EmbedLinks: 'Embed Links',
    AttachFiles: 'Attach Files',
    ReadMessageHistory: 'Read Message History',
    MentionEveryone: 'Mention @everyone, @here, and All Roles',
    UseExternalEmojis: 'Use External Emojis',
    AddReactions: 'Add Reactions',
    Connect: 'Connect',
    Speak: 'Speak',
    Stream: 'Video',
    MuteMembers: 'Mute Members',
    DeafenMembers: 'Deafen Members',
    MoveMembers: 'Move Members',
    UseVAD: 'Use Voice Activity',
    PrioritySpeaker: 'Priority Speaker'
}

module.exports = {
    name: "roleinfo",
    usage: "/roleinfo <role>",
    category: "Info",
    description: "Shows info a about a role.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'role',
            description: 'The role to show info about.',
            type: Discord.ApplicationCommandOptionType.Role,
            required: true
        }
    ],
    run: async (client, interaction) => {
    const role = interaction.options.getRole("role");

    const rolePermissions = role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (rolePermissions.includes(permission))
                finalPermissions.push(`+ ${permissions[permission]}`);
            else finalPermissions.push(`- ${permissions[permission]}`);
        }

        // Reverse role position
        const position = `\`${
            interaction.guild.roles.cache.size - role.position
        }\`/\`${interaction.guild.roles.cache.size}\``;

        const embed = new Discord.EmbedBuilder()
            .setTitle('Role Information')
            .setThumbnail(interaction.guild.iconURL({dynamic: true}))
            .addFields([
                { name: 'Role', value: role.toString(), inline: true },
                { name: 'Role ID', value: `\`${role.id}\``, inline: true },
                { name: 'Position', value: position, inline: true },
                { name: 'Mentionable', value: `\`${role.mentionable}\``, inline: true },
                { name: 'Bot Role', value: `\`${role.managed}\``, inline: true },
                { name: 'Color', value: `\`${role.hexColor.toUpperCase()}\``, inline: true },
                { name: 'Members', value: `\`${role.members.size}\``, inline: true },
                { name: 'Hoisted', value: `\`${role.hoist}\``, inline: true },
                { name: 'Created On', value: `${moment(role.createdAt).format("DD/MM/YYYY") + "\n" + moment(role.createdAt).format("hh:mm:ss")}`, inline: true },
                { name: 'Permissions', value: `\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``, inline: true }
            ])
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
            .setColor(client.config.embedcolors.default);
        interaction.reply({ embeds: [embed] });
    }
};