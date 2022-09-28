const { MessageEmbed } = require("discord.js");
const GLang = require("../../settings/models/Language.js");

module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    let guildModel = await GLang.findOne({
      guild: channel.guild.id,
    });
    if (!guildModel) {
      guildModel = await GLang.create({
        guild: channel.guild.id,
        language: "en",
      });
    }

    const { language } = guildModel;

    const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.i18n.get(language, "player", "error_desc")}`);

    channel.send({ embeds: [embed] });

    console.log(`[ERROR] Error when loading song! Track is error in [${player.guild}]`);
    if (!player.voiceChannel) player.destroy();

}