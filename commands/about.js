const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "about",
  aliases: ["bot info"],
  description: "See description about this bot",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  run: async (client, message, args, { GuildDB }) => {
    let embed = new MessageEmbed()
      .setThumbnail(client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .addField('**CREATOR**', '[**OGGY#9889**](https://oggy.ga)', true)
      .addField('**REPOSITORY**', '[**HERE**](https://github.com/nischay876/discord-musicbot)', true)
      .addField('\u200b',
        "An advanced discord music bot that supports Spotify, SoundCloud, YouTube, Twitch with Shuffling, Volume Control, Web Dashboard and alot more!"
      )
    message.channel.send(embed);
  },
}
