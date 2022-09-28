const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const { convertTime } = require("../../structures/convert.js")

const TrackAdd = [];

module.exports = { 
    name: "add",
    description: "Add song to a playlist",
    options: [
        {
            name: "name",
            description: "The name of the playlist",
            required: true,
            type: 3
        },
        {
            name: "input",
            description: "The song to add",
            required: true,
            type: 4
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

        const value = interaction.options.getString("name");
        const input = interaction.options.getString("input");

        try {
            if (user && user.isPremium) {
                
        const PlaylistName = value.replace(/_/g, ' ');
        const Inputed = input;

        const msg = await interaction.editReply(`${client.i18n.get(language, "playlist", "add_loading")}`);

        const res = await client.manager.search(Inputed, interaction.user.id);

        const Duration = convertTime(res.tracks[0].duration, true);

        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                TrackAdd.push(res.tracks[0])
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_track", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: Duration,
                        user: interaction.user
                        })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
            }
            else if(res.loadType == "PLAYLIST_LOADED") {
                for (let t = 0; t < res.tracks.length; t++) {
                    TrackAdd.push(res.tracks[t]);
                }
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_playlist", {
                        title: res.playlist.name,
                        url: Inputed,
                        duration: convertTime(res.playlist.duration),
                        track: res.tracks.length,
                        user: interaction.user
                        })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
            }
            else if(res.loadType == "SEARCH_RESULT") {
                TrackAdd.push(res.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_search", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: Duration,
                        user: interaction.user
                        })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
            }
            else if(res.loadType == "LOAD_FAILED") { //Error loading playlist.
                return msg.edit(`${client.i18n.get(language, "playlist", "add_fail")}`);
            }
        }
        else { //The playlist link is invalid.
            return msg.edit(`${client.i18n.get(language, "playlist", "add_match")}`);
        }

        Playlist.findOne({ name: PlaylistName }).then(playlist => {
            if(playlist) {
                if(playlist.owner !== interaction.user.id) { interaction.followUp(`${client.i18n.get(language, "playlist", "add_owner")}`); TrackAdd.length = 0; return; }
                const LimitTrack = playlist.tracks.length + TrackAdd.length;
                if(LimitTrack > client.config.LIMIT_TRACK) { interaction.followUp(`${client.i18n.get(language, "playlist", "add_limit_track", {
                    limit: client.config.LIMIT_TRACK
                })}`); TrackAdd.length = 0; return; }
                for (let songs = 0; songs < TrackAdd.length; songs++) {
                    playlist.tracks.push(TrackAdd[songs]);
                }
                playlist.save().then(() => {
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_added", {
                        count: TrackAdd.length,
                        playlist: PlaylistName
                        })}`)
                    .setColor(client.color)
                interaction.followUp({ content: " ", embeds: [embed] });

                TrackAdd.length = 0;
                });
            }
        }).catch(err => console.log(err));
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

        return interaction.editReply({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        interaction.editReply({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};