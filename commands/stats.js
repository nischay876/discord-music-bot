const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
    name: "stats",
    description: "Get information about the bot",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["ping", "info"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message) => {
            const { version } = require("discord.js")
            cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");

            const embed = new MessageEmbed()
            embed.setColor(client.botconfig.EmbedColor)
            embed.addFields({
                name: ':ping_pong: Ping',
                value: `┕\`${Math.round(client.ws.ping)}ms\``,
                inline: true
            },
            {
                name: ':clock1: Uptime',
                value: `┕\`${duration}\``,
                inline: true
            },{
                name: ':file_cabinet: Memory',
                value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
                inline: true
            })


        return message.channel.send(embed);
    })
},
SlashCommand: {
/**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
 run: async (client, interaction) => {
        const { version } = require("discord.js")
        cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D[d], H[h], m[m]");

        const embed = new MessageEmbed()
        embed.setColor(client.botconfig.EmbedColor)
        embed.addFields({
            name: ':ping_pong: Ping',
            value: `┕\`${Math.round(client.ws.ping)}ms\``,
            inline: true
        },
        {
            name: ':clock1: Uptime',
            value: `┕\`${duration}\``,
            inline: true
        },{
            name: ':file_cabinet: Memory',
            value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
            inline: true
        })


    return interaction.send(embed);
})
}
}
};