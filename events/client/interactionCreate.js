const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('../..');
const config = client.config

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) })
				if (slashCommand.ownerOnly) {
					if (!client.config.ownerID.includes(interaction.user.id)) {
						return interaction.reply({ embeds: [new Discord.MessageEmbed()
							.setColor(client.config.embedcolors.error)
							.setTitle(`Error.`)
							.setDescription(`This command only for the bot owner!`)
							.setTimestamp()
							.setFooter({ text: client.config.embedfooterText})], ephemeral: true });
					}
				}
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
							.setTitle(`Error.`)
							.setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
							.setColor(client.config.embedcolors.error)
							.setTimestamp()
							.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
							.setTitle(`Error.`)
							.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
							.setColor(client.config.embedcolors.error)
							.setTimestamp()
							.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
						return interaction.reply({ embeds: [botPerms] })
					}

				}

					await slashCommand.run(client, interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if (command.ownerOnly) {
					if (!client.config.ownerID.includes(interaction.user.id)) {
						return interaction.reply({ embeds: [new Discord.MessageEmbed()
							.setColor(client.config.embedcolors.error)
							.setTitle(`Error.`)
							.setDescription(`This command only for the bot owner!`)
							.setTimestamp()
							.setFooter({ text: client.config.embedfooterText})], ephemeral: true });
					}
				}
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
							.setTitle(`Error.`)
							.setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
							.setColor(client.config.embedcolors.error)
							.setTimestamp()
							.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
							.setTitle(`Error.`)
							.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
							.setColor(client.config.embedcolors.error)
							.setTimestamp()
							.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
						return interaction.reply({ embeds: [botPerms] })
					}

				}
					await slashCommand.run(client, interaction);
			}
		} catch (error) {
				console.log(error);
		}
});