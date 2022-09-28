const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
    ownerOnly: true,
    config: {
        name: "botservers",
        description: "view all bot server",
        //category: "Utilities",
        accessableby: "Owner",
        aliases: ["slist"]
    },
    run: async (client, message, args) => {
        
            let data = [];
            client.guilds.cache.forEach((x) => {
              message.channel.send(
                `\`${x.name} | ${x.memberCount} members (ID: ${x.id})\`\n`
              );
            });
      
            if (data.length > 0) {
              data.sort();
              data = `🔹 ` + data.join("\n🔹");
            } else {
              data = "[No server found]";
            }
   }
};