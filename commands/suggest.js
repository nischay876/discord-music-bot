const Discord = module.require("discord.js");

module.exports = {
  name: "suggest",
  description: "Suggestion",
  run: async (client, message, args) => {
    const avatar = message.author.avatarURL;
    const suggestchannel = client.channels.cache.get("918561799756972092");
    const suggestion = args.join(" ");
    if (!suggestion) {
      return message.channel.send("Please Suggest Something");
    }
    message.channel.send(
      `**<@${message.author.id}> Thanks For Suggestion**`
    );
    const embed = new Discord.MessageEmbed()
      .setAuthor(`New Suggestion!`, avatar)
      .setDescription(`${suggestion} \n\nBy: ${message.author.tag}`)
      .setFooter(`ID: ${message.author.id}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setColor(client.botconfig.EmbedColor);

    suggestchannel.send(embed);
  },
  catch(error) {
    const errorlogs = client.channels.cache.get("918561799756972092");
    message.channel.send(
      "Looks like an error has occured. The error has been reported to the Report Section"
    );
    errorlogs.send(`Error in Suggest Command! \nError: \n` + error);
  },
};