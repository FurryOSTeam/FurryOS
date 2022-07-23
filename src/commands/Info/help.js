const { readdirSync } = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: "help",
    usage: '/help <command>',
    category: "Info",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'command',
            description: 'What command do you need help with.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                //new client.discord.MessageButton()
                //    .setLabel("GitHub")
                //    .setStyle("LINK")
                //    .setURL(""),
                new Discord.ButtonBuilder()
                    .setLabel("Support")
                    .setStyle(5)
                    .setURL("https://discord.gg/pD2QwAqdMY")
            );

        const commandInt = interaction.options.getString("command");
        if (!commandInt) {
            const funCommandsList = [];
            readdirSync(`./src/commands/Fun`).forEach((file) => {
                const filen = require(`../../commands/Fun/${file}`);
                const name = `\`${filen.name}\``
                funCommandsList.push(name);
            });
            const imageCommandsList = [];
            readdirSync(`./src/commands/Image`).forEach((file) => {
                const filen = require(`../../commands/Image/${file}`);
                const name = `\`${filen.name}\``
                imageCommandsList.push(name);
            });
            const moderationCommandsList = [];
            readdirSync(`./src/commands/Moderation`).forEach((file) => {
                const filen = require(`../../commands/Moderation/${file}`);
                const name = `\`${filen.name}\``
                moderationCommandsList.push(name);
            });
            const furryimagesCommandsList = [];
            readdirSync(`./src/commands/Furry Images`).forEach((file) => {
                const filen = require(`../../commands/Furry Images/${file}`);
                const name = `\`${filen.name}\``
                furryimagesCommandsList.push(name);
            });
            const nsfwCommandsList = [];
            readdirSync(`./src/commands/NSFW`).forEach((file) => {
                const filen = require(`../../commands/NSFW/${file}`);
                const name = `\`${filen.name}\``
                nsfwCommandsList.push(name);
            });
            const ownerCommandsList = [];
            readdirSync(`./src/commands/Owner`).forEach((file) => {
                const filen = require(`../../commands/Owner/${file}`);
                const name = `\`${filen.name}\``
                ownerCommandsList.push(name);
            });
            const infoCommandsList = [];
            readdirSync(`./src/commands/Info`).forEach((file) => {
                const filen = require(`../../commands/Info/${file}`);
                const name = `\`${filen.name}\``
                infoCommandsList.push(name);
            });
            const helpEmbed = new Discord.EmbedBuilder()
                .setTitle(`${client.user.username} SlashHelp`)
                .setDescription(` Hello **<@${interaction.member.id}>**, I am <@${client.user.id}>.  \nYou can use \`/help <slash_command>\` to see more info about the SlashCommands!\n**Total SlashCommands:** ${client.slashCommands.size}`)
                .addFields([
                    { name: "🎉 - Fun", value: funCommandsList.map((data) => `${data}`).join(", "), inline: true },
                    { name: "🌃 - Image", value: imageCommandsList.map((data) => `${data}`).join(", "), inline: true },
                    { name: "📷 - Furry Images", value: furryimagesCommandsList.map((data) => `${data}`).join(", "), inline: true },
                    { name: "🔧 - Moderation", value: moderationCommandsList.map((data) => `${data}`).join(", "), inline: true },
                    { name: "🔒 - Owner", value: ownerCommandsList.map((data) => `${data}`).join(", "), inline: true },
                    { name: "ℹ - Info", value: infoCommandsList.map((data) => `${data}`).join(", "), inline: true }
                ])
                .setColor(client.config.embedcolors.default)
                .setTimestamp()
                .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

                if (interaction.channel.nsfw) {
                    helpEmbed.addFields([{ name: "🔞 - NSFW", value: nsfwCommandsList.map((data) => `${data}`).join(", "), inline: true }]);
                } else {
                    helpEmbed.addFields([{ name: "🔞 - NSFW", value: "NSFW commands are only available in NSFW channels!", inline: true }]);
                };

            interaction.reply({ embeds: [helpEmbed], components: [row], ephemeral: true});
        } else {
            const command = client.slashCommands.get(commandInt.toLowerCase());
            if (!command) {
                interaction.reply({ embeds: [new Discord.EmbedBuilder()
                    .setColor(client.config.embedcolors.error)
                    .setTitle(`Error.`)
                    .setDescription(`There isn't any SlashCommand named "${commandInt}"`)
                    .setTimestamp()
                    .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })], ephemeral: true });
            } else {
                let command = client.slashCommands.get(commandInt.toLowerCase());
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new Discord.EmbedBuilder()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` SlashCommand`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(client.config.embedcolors.default)
                    .setTimestamp()
                    .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

                interaction.reply({ embeds: [helpCmdEmbed], ephemeral: true});
            }
        }
    },
};