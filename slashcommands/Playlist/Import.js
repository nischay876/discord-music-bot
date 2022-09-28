const { MessageEmbed, Permissions } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const { convertTime } = require('../../structures/convert.js');

module.exports = { 
    name: "import",
    description: "Import a playlist to queue.",
    options: [
        {
            name: "name",
            description: "The name of the playlist",
            required: true,
            type: 3
        }
    ],
    ownerOnly: false,
    run: async (interaction, client, user, language) => {
		await interaction.deferReply({ ephemeral: false });

		const value = interaction.options.getString("name");
		
		const { channel } = interaction.member.voice;
		if (!channel) return interaction.editReply(`${client.i18n.get(language, "playlist", "import_voice")}`);
		if (!channel.permissionsFor(interaction.guild.me).has(Permissions.FLAGS.CONNECT)) return interaction.editReply(`${client.i18n.get(language, "playlist", "import_join")}`);
		if (!channel.permissionsFor(interaction.guild.me).has(Permissions.FLAGS.SPEAK)) return interaction.editReply(`${client.i18n.get(language, "playlist", "import_speak")}`);

		try {
			if (user && user.isPremium) {

		let player = client.manager.get(interaction.guild.id);
		if(!player) { player = await client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });

		const state = player.state;
        if (state != "CONNECTED") await player.connect();

		}

		const Plist = value.replace(/_/g, ' ');
		const SongAdd = [];
		let SongLoad = 0;

		const playlist = await Playlist.findOne({ name: Plist });
		if(!playlist) { interaction.editReply(`${client.i18n.get(language, "playlist", "import_notfound")}`); player.destroy(); return; }
		if(playlist.private && playlist.owner !== interaction.user.id) { interaction.editReply(`${client.i18n.get(language, "playlist", "import_private")}`); player.destroy(); return; }

		const totalDuration = convertTime(playlist.tracks.reduce((acc, cur) => acc + cur.duration, 0));

		const msg = await interaction.editReply(`${client.i18n.get(language, "playlist", "import_loading")}`);

		const embed = new MessageEmbed() // **Imported • \`${Plist}\`** (${playlist.tracks.length} tracks) • ${message.user}
			.setDescription(`${client.i18n.get(language, "playlist", "import_imported", {
				name: Plist,
				tracks: playlist.tracks.length,
				duration: totalDuration,
				user: interaction.user
			})}`)
			.setColor(client.color)

		msg.edit({ content: " ", embeds: [embed] });

		for (let i = 0; i < playlist.tracks.length; i++) {
			const res = await client.manager.search(playlist.tracks[i].uri, interaction.user);
			if(res.loadType != "NO_MATCHES") {
				if(res.loadType == "TRACK_LOADED") {
					SongAdd.push(res.tracks[0]);
					SongLoad++;
				}
				else if(res.loadType == "PLAYLIST_LOADED") {
					for (let t = 0; t < res.playlist.tracks.length; t++) {
						SongAdd.push(res.playlist.tracks[t]);
						SongLoad++;
					}
				}
				else if(res.loadType == "SEARCH_RESULT") {
					SongAdd.push(res.tracks[0]);
					SongLoad++;
				}
				else if(res.loadType == "LOAD_FAILED") {
					{ interaction.channel.send(`${client.i18n.get(language, "playlist", "import_fail")}`); player.destroy(); return; }
				}
			}
			else {
				{ interaction.channel.send(`${client.i18n.get(language, "playlist", "import_match")}`); player.destroy(); return; }
			}

			if(SongLoad == playlist.tracks.length) {
				player.queue.add(SongAdd);
				if (!player.playing) { player.play(); }
			}
		}
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
         //   .addField('STORE WEBSITE', '[**HERE**](https://mecute.tebex.io)', true)
            .addField('1 YEAR', '[**HERE**](https://mecute.tebex.io/package/5101638)', true)
            .addField('6 MONTH', '[**HERE**](https://mecute.tebex.io/package/5101650)', true)
            .addField('1 MONTH', '[**HERE**](https://mecute.tebex.io/package/5101652)', true)
            .setColor(client.color)
            .setTimestamp()

        return interaction.channel.send({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        interaction.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};