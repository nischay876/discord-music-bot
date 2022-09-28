const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    config: {
        name: "about",
        description: "Show Information!",
        category: "Utilities",
        accessableby: "member",
        aliases: ["abt"]
    },
    run: async (client, message) => {
        
        let embed = new MessageEmbed()
        .setThumbnail(`https://cdn.discordapp.com/avatars/889880800655474768/208d031ace5b04a6686d8a588e93dc6a.png?size=4096`)
        .setColor(client.colour)
        .addField('**CREATOR**', '[**OGGY#9889**](https://oggy.ga)', true)
        .addField('**STORE**', '[**mecute.tebex.io**](https://mecute.tebex.io)', true)
        .addField('**EMAIL**', '[**hi@mecute.ga**](https://u.oggy.ga/mecuteemail)', true)
        .addField('\u200b',
          "An advanced discord Music  Bot that supports Spotify, SoundCloud, YouTube, Twitch with Shuffling, Volume Control, Web Dashboard and alot more!"
        )
        message.reply({embeds: [embed]})

    }
};

