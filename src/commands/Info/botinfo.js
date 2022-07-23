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
            const botinfo = new Discord.MessageEmbed()
                .setAuthor({ name: interaction.client.user.username })
                .setTitle("__**Stats:**__")
                .setColor(client.config.embedcolors.default)
                .addField("`⏳` Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField("`⌚️` Uptime ", `${duration}`, true)
                .addField("`📁` Users", `${interaction.client.users.cache.size}`, true)
                .addField("`📁` Servers", `${interaction.client.guilds.cache.size}`, true)
                .addField("`📁` Channels ", `${interaction.client.channels.cache.size}`, true)
                .addField("`👾` Discord.js", `v${version}`, true)
                .addField("`🤖` Node", `${process.version}`, true)
                .addField("`🤖` CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("`🤖` CPU usage", `\`${percent.toFixed(2)}%\``, true)
                .addField("`🤖` Arch", `\`${os.arch()}\``, true)
                .addField("`💻` Platform", `\`\`${os.platform()}\`\``, true)
                .addField("API Latency", `${(interaction.client.ws.ping)}ms`)
                .setTimestamp()
                .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL() });
           await interaction.reply({ embeds: [botinfo] })
        });
    }
}