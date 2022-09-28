const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    config: {
        name: "create",
        usage: "<playlist name>",
        description: "Create a playlist",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "create_arg", {
            prefix: prefix
        })}`);
        if(args[0].length > 16) return message.channel.send(`${client.i18n.get(language, "playlist", "create_toolong")}`);

        const PlaylistName = args[0].replace(/_/g, ' ');

        const msg = await message.channel.send(`${client.i18n.get(language, "playlist", "create_loading")}`);

        const Limit = await Playlist.find({ owner: message.author.id }).countDocuments();
        const Exist = await Playlist.findOne({ name: PlaylistName });

        if(Exist) { msg.edit(`${client.i18n.get(language, "playlist", "create_name_exist")}`); return; }
        if(Limit >= client.config.LIMIT_PLAYLIST) { msg.edit(`${client.i18n.get(language, "playlist", "create_limit_playlist", {
            limit: client.config.LIMIT_PLAYLIST
        })}`); return; }

        const CreateNew = new Playlist({
            name: PlaylistName,
            owner: message.author.id,
            tracks: [],
            private: true,
            created: Date.now()
        });

        CreateNew.save().then(() => {
            const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "playlist", "create_created", {
                playlist: PlaylistName
                })}`)
            .setColor(client.color)
        msg.edit({ content: " ", embeds: [embed] });
        });

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

        return message.reply({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};