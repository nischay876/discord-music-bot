const { Message, MessageEmbed } = require('discord.js')
const ms = require('ms')


module.exports = {
  name: 'mute',
  description: "Mute server members",
  permissions: ['MANAGE_ROLES'],
  usage: "[@mention/ID]",
  aliases: [''],
  run: async (client, message, args) => {

    const dmuser = message.mentions.users.first();
    let {guild} = message;
  
    let permissionembed = new MessageEmbed()
    .setColor(client.botconfig.EmbedColor)
    .setDescription(`<@${message.author.id}> only server administrators are allowed to use mute command`)

    if (!message.member.hasPermission('MUTE_MEMBERS','MANAGE_ROLES')) return message.channel.send(permissionembed);
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!Member) return message.channel.send('Member is not found.')
    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
    
    let reason = args.slice(1).join(' ');

    if (!role) {
      try {
        message.channel.send('**Muted role is not found, attempting to create muted role.**')

        let muterole = await message.guild.roles.create({
          data: {
            name: 'muted',
            permissions: []
          }
        });
        message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
          await channel.createOverwrite(muterole, {
            CONNECT: true,
            SPEAK: false
          }) });
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
          await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
        });
        message.channel.send('**Muted role has sucessfully been created.**')
      } catch (error) {
        console.log(error)
      }
    };

    let mutedembed = new MessageEmbed()
    .setColor(client.botconfig.EmbedColor)
    .setAuthor(`You are muted at ${guild.name}`,message.guild.iconURL())
    .setDescription(reason)
    .setFooter(`Muted by ${message.author.tag}`)

    let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
    if (Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
    await Member.roles.add(role2)
    dmuser.send(mutedembed)
    message.channel.send(`**${Member} is now muted**`);
  }
}