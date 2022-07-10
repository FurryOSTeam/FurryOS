const { MessageEmbed } = require('discord.js');
const moment = require('moment');

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
    options: [
        {
            name: 'role',
            description: 'The role to show info about.',
            type: 'ROLE',
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

        const embed = new MessageEmbed()
            .setTitle('Role Information')
            .setThumbnail(interaction.guild.iconURL({dynamic: true}))
            .addField('Role', role.toString(), true)
            .addField('Role ID', `\`${role.id}\``, true)
            .addField('Position', position, true)
            .addField('Mentionable', `\`${role.mentionable}\``, true)
            .addField('Bot Role', `\`${role.managed}\``, true)
            .addField('Color', `\`${role.hexColor.toUpperCase()}\``, true)
            .addField('Members', `\`${role.members.size}\``, true)
            .addField('Hoisted', `\`${role.hoist}\``, true)
            .addField(
                'Created On',
                `\`${moment(role.createdAt).format("DD/MM/YYYY") + "\n" + moment(role.createdAt).format("hh:mm:ss")}`,
                true
            )
            .addField(
                'Permissions',
                `\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``
            )
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
            .setColor(client.config.embedcolors.default);
        interaction.reply({ embeds: [embed] });
    }
};