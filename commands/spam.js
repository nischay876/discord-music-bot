const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");
const talkedRecently = new Set();

module.exports = {
  name: "spam",
  description: "Spam tag anyone",
  usage: "[@mention]",
  aliases: ["sp"],

  run: async (client, message, args, { GuildDB }) => {
    
    let permissionembed = new MessageEmbed()
    .setColor(client.botconfig.EmbedColor)
    .setDescription(`<@${message.author.id}> Only Server Administrators Are Allowed To Spam Tag`)

    let usageembed = new MessageEmbed()
    .setColor(client.botconfig.EmbedColor)
    .setTitle("Command Usage")
    .setDescription(`${GuildDB.prefix}spam [@mention]`)

    let timeembed = new MessageEmbed()
    .setColor(client.botconfig.EmbedColor)
    .setTitle("Timeout 5 minutes")
    .setDescription(`You need to wait 5 minutes to use this command again`)

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(permissionembed);

    let spamm = args.slice(0).join(' ');
    
    if(message.mentions.users.size === 0){  
    return message.channel.send(usageembed);
    }

    if (talkedRecently.has(message.author.id)) {
    message.channel.send(timeembed);
    } else {
    message.channel.send(`${spamm}`);
    message.channel.send(`${spamm}`);
    message.channel.send(`${spamm}`);
    message.channel.send(`${spamm}`);
    message.channel.send(`${spamm}`);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
    }, 300000); }
  }
}