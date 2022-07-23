const moment = require('moment');
const Discord = require('discord.js');

const permissions = {
    ADMINISTRATOR: 'Administrator',
    VIEW_AUDIT_LOG: 'View Audit Log',
    VIEW_GUILD_INSIGHTS: 'View Server Insights',
    MANAGE_GUILD: 'Manage Server',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_CHANNELS: 'Manage Channels',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    CREATE_INSTANT_INVITE: 'Create Invite',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_EMOJIS_AND_STICKERS: 'Manage Emojis',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    VIEW_CHANNEL: 'Read Text Channels & See Voice Channels',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention @everyone, @here, and All Roles',
    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
    ADD_REACTIONS: 'Add Reactions',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    STREAM: 'Video',
    MUTE_MEMBERS: 'Mute Members',
    DEAFEN_MEMBERS: 'Deafen Members',
    MOVE_MEMBERS: 'Move Members',
    USE_VAD: 'Use Voice Activity',
    PRIORITY_SPEAKER: 'Priority Speaker'
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