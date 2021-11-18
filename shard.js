const {ShardingManager} = require('discord.js');
const config = require('./utils/config.json');

const shards = new ShardingManager('/index.js', {
    token: process.env.token,
    totalShards: "auto"
});

shards.on("shardCreate", shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.spawn(shards.totalShards, 10000)