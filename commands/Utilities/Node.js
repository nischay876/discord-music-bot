const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    config: {
        name: "node",
        description: "Show Node Information!",
        category: "Utilities",
        accessableby: "member",
        aliases: ["ll"]
    },
    run: async (client, message) => {
        
        const all = client.manager.nodes.map(node => 
            `Node ${(node.options.identifier)} Connected` +
            `\nPlayer: ${node.stats.players}` +
            `\nPlaying Players: ${node.stats.playingPlayers}` +
            `\nUptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
            `\n\nMemory` +
            `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
            `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
            "\n\nCPU" +
            `\nCores: ${node.stats.cpu.cores}` +
            `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');

        const embed = new MessageEmbed()
            .setAuthor({ name: 'Lavalink Node', iconURL: client.user.displayAvatarURL()})
            .setDescription(`\`\`\`${all}\`\`\``)
            .setColor(client.embedColor)
        message.reply({embeds: [embed]})

    }
};

