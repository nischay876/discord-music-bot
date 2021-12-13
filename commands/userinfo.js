const Discord = require('discord.js');
const moment = require('moment');

module.exports=  {
    name: "userinfo",
    description: "Pulls the userinfo of yourself or a user!",
    usage: "[@mention/ID]",
    aliases: ["ui"],
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

    if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
    if (member.presence.status === 'online') member.presence.status = 'Online';
    if (member.presence.status === 'idle') member.presence.status = 'Idle';
    if (member.presence.status === 'offline') member.presence.status = 'offline';

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
    let status = member.presence.status;

        // Format Permissions
    const permissions = member.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ") // Replace all underscores with spaces
        .replace(/\w\S*/g, txt => {
          // Capitalize the first letter of each word
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

        // Calculate Join Position
    let joinPosition;
    const members = message.guild.members.cache.array();
    members.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < members.length; i++) {
      if (members[i].id == message.guild.member(message.author).id)
        joinPosition = i;
    }

    const userEmbed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setColor(client.botconfig.EmbedColor)
    .setThumbnail(member.user.displayAvatarURL())
    .addField("Member ID", member.id, true) 
    .addField('Roles', `<@&${member._roles.join('> <@&')}>`, true) 
    .addField("Account Created On:", ` ${moment.utc(member.user.createdAt, true).format("dddd, MMMM Do YYYY")}`, true) 
    .addField('Joined The Server On:', `${joineddate}`, true) 
    .addField("Status", status, true) 
    .addField("Permissions", permissions.join(", ")) 

    message.channel.send(userEmbed);
    }
}