const { readdirSync } = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: "help",
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: 'What command do you need help',
            type: 'STRING',
            required: false
        }
    ],
    category: "Info",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,
    run: async (client, interaction) => {
        const row = new client.discord.MessageActionRow()
            .addComponents(
                //new client.discord.MessageButton()
                //    .setLabel("GitHub")
                //    .setStyle("LINK")
                //    .setURL(""),
                new client.discord.MessageButton()
                    .setLabel("Support")
                    .setStyle("LINK")
                    .setURL("https://discord.gg/pD2QwAqdMY")
            );

        const commandInt = interaction.options.getString("command");
        if (!commandInt) {
            const funCommandsList = [];
            readdirSync(`./src/Fun`).forEach((file) => {
                const filen = require(`../../src/Fun/${file}`);
                const name = `\`${filen.name}\``
                funCommandsList.push(name);
            });
            const imageCommandsList = [];
            readdirSync(`./src/Image`).forEach((file) => {
                const filen = require(`../../src/Image/${file}`);
                const name = `\`${filen.name}\``
                imageCommandsList.push(name);
            });
            const moderationCommandsList = [];
            readdirSync(`./src/Moderation`).forEach((file) => {
                const filen = require(`../../src/Moderation/${file}`);
                const name = `\`${filen.name}\``
                moderationCommandsList.push(name);
            });
            const furryimagesCommandsList = [];
            readdirSync(`./src/Furry Images`).forEach((file) => {
                const filen = require(`../../src/Furry Images/${file}`);
                const name = `\`${filen.name}\``
                furryimagesCommandsList.push(name);
            });
            const nsfwCommandsList = [];
            readdirSync(`./src/NSFW`).forEach((file) => {
                const filen = require(`../../src/NSFW/${file}`);
                const name = `\`${filen.name}\``
                nsfwCommandsList.push(name);
            });
            const ownerCommandsList = [];
            readdirSync(`./src/Owner`).forEach((file) => {
                const filen = require(`../../src/Owner/${file}`);
                const name = `\`${filen.name}\``
                ownerCommandsList.push(name);
            });
            const infoCommandsList = [];
            readdirSync(`./src/Info`).forEach((file) => {
                const filen = require(`../../src/Info/${file}`);
                const name = `\`${filen.name}\``
                infoCommandsList.push(name);
            });
            const helpEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} SlashHelp`)
                .setDescription(` Hello **<@${interaction.member.id}>**, I am <@${client.user.id}>.  \nYou can use \`/help <slash_command>\` to see more info about the SlashCommands!\n**Total SlashCommands:** ${client.slash.size}`)
                .addField("🎉 - Fun", funCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🌃 - Image", imageCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("📷 - Furry Images", furryimagesCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🔧 - Moderation", moderationCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🔒 - Owner", ownerCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("ℹ - Info", infoCommandsList.map((data) => `${data}`).join(", "), true)
                .setColor(client.config.embedcolors.default)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                if (interaction.channel.nsfw) {
                    helpEmbed.addField("🔞 - NSFW", nsfwCommandsList.map((data) => `${data}`).join(", "), true);
                } else {
                    helpEmbed.addField("🔞 - NSFW", "NSFW commands are only available in NSFW channels!", true);
                };

            interaction.reply({ embeds: [helpEmbed], components: [row], ephemeral: true});
        } else {
            const command = client.slash.get(commandInt.toLowerCase());
            if (!command) {
                interaction.reply({ embeds: [new Discord.MessageEmbed()
                    .setColor(client.config.embedcolors.error)
                    .setTitle(`Error.`)
                    .setDescription(`There isn't any SlashCommand named "${commandInt}"`)
                    .setTimestamp()
                    .setFooter({ text: client.config.embedfooterText})], ephemeral: true });
            } else {
                let command = client.slash.get(commandInt.toLowerCase());
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` SlashCommand`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(client.config.embedcolors.default)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpCmdEmbed], ephemeral: true});
            }
        }
    },
};