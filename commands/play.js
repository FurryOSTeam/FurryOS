const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();
const Discord = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'play'],
    description: 'Plays music in a vc.',
  	usage: '| f!stop | f!skip | <video name/url>',
	  category: 'Music',
    async execute(client, message, args, cmd){
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`❌ You need to be in a voice channel to use this command!`)
        .setTimestamp() 
        .setFooter({ text: 'FurryOS'})]});
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`❌ You do not have permission to run this command!`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS'})]});
        if (!permissions.has('SPEAK')) return message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`❌ You do not have permission to run this command!`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS'})]});


        const server_queue = queue.get(message.guild.id);


        if (cmd === 'play'){
            if (!args.length) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`❌ You need to include the second argument!`)
            .setTimestamp()
            .setFooter({ text: 'FurryOS'})]});
            let song = {};


            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {

                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send({ embeds: [new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`❌ Error finding video`)
                    .setTimestamp()
                    .setFooter({ text: 'FurryOS'})]});
                }
            }

          
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
   
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                    message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`✅ Connected & bound to **${voice_channel.name}** VC`)
                .setTimestamp()
                .setFooter({ text: 'FurryOS'})]});
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send({ embeds: [new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`❌ Error connecting to the VC`)
                    .setTimestamp()
                    .setFooter({ text: 'FurryOS'})]});
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`✅ **${song.title}** added to the queue!`)
                .setTimestamp()
                .setFooter({ text: 'FurryOS'})]});
                
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'fuckoff') stop_song(message, server_queue);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    
        if (!song){
            setTimeout(function(){ 
          if (!song){
            song_queue.voice_channel.leave();
            queue.delete(guild.id);
            song_queue.text_channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`✅ Disconnected from VC!`)
            .setTimestamp()
            .setFooter({ text: 'FurryOS'})]});
            return;
            };
            }, 5000);
    };
   try{
    const stream = ytdl(song.url, { filter: 'audioonly' });

    song_queue.connection.play(stream, { seek: 0, volume: 0.5 }).on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`✅ Now playing **${song.title}**`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS'})]});
    }catch(e){
  }
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send({ embeds: [new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`❌ You need to be in a voice channel to use this command!`)
    .setTimestamp()
    .setFooter({ text: 'FurryOS'})]});
    if(!server_queue){
        return message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`❌ There are no songs in the queue.`)
        .setTimestamp()
        .setFooter({ text: 'FurryOS'})]});
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send({ embeds: [new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`❌ You need to be in a voice channel to use this command!`)
    .setTimestamp()
    .setFooter({ text: 'FurryOS'})]});
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}