const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

module.exports = {
    name: "botinfo",
    usage: "/botinfo",
    category: "Info",
    description: "Shows lots of info about the bot.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
      cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const botinfo = new Discord.EmbedBuilder()
                .setAuthor({ name: interaction.client.user.username })
                .setTitle("__**Stats:**__")
                .setColor(client.config.embedcolors.default)
                .addFields([
                    { name: "`⏳` Mem Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline: true },
                    { name: "`⌚️` Uptime ", value: `${duration}`, inline: true },
                    { name: "`📁` Users", value: `${interaction.client.users.cache.size}`, inline: true },
                    { name: "`📁` Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
                    { name: "`📁` Channels ", value: `${interaction.client.channels.cache.size}`, inline: true },
                    { name: "`👾` Discord.js", value: `v${version}`, inline: true },
                    { name: "`🤖` Node", value: `${process.version}`, inline: true },
                    { name: "`🤖` CPU", value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\`` },
                    { name: "`🤖` CPU usage", value: `\`${percent.toFixed(2)}%\``, inline: true },
                    { name: "`🤖` Arch", value: `\`${os.arch()}\``, inline: true },
                    { name: "`💻` Platform", value: `\`\`${os.platform()}\`\``, inline: true },
                    { name: "API Latency", value: `${(interaction.client.ws.ping)}ms` }
                ])
                .setTimestamp()
                .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL() });
           await interaction.reply({ embeds: [botinfo] })
        });
    }
}