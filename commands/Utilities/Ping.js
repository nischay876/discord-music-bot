const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = { 
    config: {
        name: "ping",
        description: "ping bot!",
        accessableby: "Member",
        category: "Utilities",
    },
    run: async (client, message) => {

        const duration = moment
        .duration(message.client.uptime)
        .format(" D[d], H[h], m[m]");
  
          const PingEmbed = new MessageEmbed()
            .setColor(client.color)
            .addField("Bot Latency", `\`\`\`ini\n[ ${Math.round(client.ws.ping)}ms ]\n\`\`\``, true)
            .addField("Up Time", `\`\`\`ini\n[ ${duration} ]\n\`\`\``, true)
            
            message.channel.send({ embeds: [PingEmbed] });

    }
}