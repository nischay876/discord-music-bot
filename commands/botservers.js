const Discord = require("discord.js");
require("dotenv");

module.exports = {
  name: "botservers",
  aliases: ["slist"],
  description: "Check what Servers the bot is in!",
  run: async (client, message, args) => {
    try {
      if (message.author.id != '813561253175361558')
        return message.channel.send(
        `Only Bot Owner [OGGY#9889](https://www.oggy.ga) Can Use This Command`
        );
      let data = [];
      client.guilds.cache.forEach((x) => {
        message.channel.send(
          `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`
        );
      });

      if (data.length > 0) {
        data.sort();
        data = `🔹 ` + data.join("\n🔹");
      } else {
        data = "[No server found]";
      }
    } catch (err) {
      const errorlogs = client.channels.cache.get("940183287282954271");

      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );
    }
  },
};