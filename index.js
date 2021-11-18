const {ShardingManager} = require('discord.js');

const shards = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings'],
	  shardArgs: ['--ansi', '--color'],
    token: process.env.token,
    totalShards: "auto"
});

shards.on("shardCreate", shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.spawn(shards.totalShards, 100+00)