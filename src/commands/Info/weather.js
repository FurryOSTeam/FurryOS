const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    usage: "/weather <location>",
    category: "Info",
    description: "Shows the weather in a place you pick.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "location",
          description: "Location for the weather.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      }
  ],
    run: async (client, interaction) => {
    weather.find({search: interaction.options.getString("location"), degreeType: 'F'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return interaction.reply({ content: error, ephemeral: true });

        if(result === undefined || result.length === 0) return interaction.reply({ content: '**Invalid** location', ephemeral: true });

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.EmbedBuilder()
            .setDescription(`**${current.skytext}**`)
            .setAuthor({ name: `Weather forecast for ${current.observationpoint}` })
            .setThumbnail(current.imageUrl)
            .setColor(client.config.embedcolors.default)
            .addFields([
                { name: 'Timezone', value: `UTC${location.timezone}`, inline: true },
                { name: 'Degree Type', value: 'Fahrenheit', inline: true },
                { name: 'Temperature', value: `${current.temperature}°`, inline: true },
                { name: 'Wind', value: current.winddisplay, inline: true },
                { name: 'Feels like', value: `${current.feelslike}°`, inline: true },
                { name: 'Humidity', value: `${current.humidity}%`, inline: true },
                { name: 'Day', value: `${current.day}`, inline: true }
            ])
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        interaction.reply({ embeds: [weatherinfo] })
        })        
    }
}