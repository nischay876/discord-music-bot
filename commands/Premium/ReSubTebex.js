const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js');
const PremiumUser = require('../../settings/models/PremiumUser.js');
const moment = require('moment')

module.exports = { 
    config: {
        name: "resubtebex",
        aliases: [],
        usage: "resubtebex <plan> <user id>",
        description: "Give premium to a user!",
     //   accessableby: "Owner",
      //  category: "premium",
    },
    run: async (client, message, args) => {
    if(message.author.id != '695664615534755850') return message.channel.send("You're not Tebex#8323 !")
    console.log(chalk.magenta(`[COMMAND] Premium used by ${message.author.tag} from ${message.guild.name}`));

    const plan = args[0];
    const plans = ['daily', 'weekly', 'monthly', 'halfyearly', 'yearly','100_Year'];

    if (!plan) return message.channel.send({ content: `**> Please provide plan**` })

    if (!plans.includes(args[0]))
      return message.channel.send({ content:  `**Invalid Plan, available plans:** ${plans.join(', ')}`})

    let time;
    if (plan === 'daily') time = Date.now() + 86400000;
    if (plan === 'weekly') time = Date.now() + 86400000 * 7;
    if (plan === 'monthly') time = Date.now() + 86400000 * 30;
    if (plan === 'halfyearly') time = Date.now() + 86400000 * 183;
    if (plan === 'yearly') time = Date.now() + 86400000 * 365;
    if (plan === '100_Year') time = Date.now() + 86400000 * 36500;

    if(!args[1]) return message.channel.send(`**Please specify a member id** Example: \`${client.prefix}premium <plan> <user id>\``);
    const member = args[1];
    if(member != client.users.cache.get(member)) return message.channel.send(`**Please give me the user's id!**`);

    let PushMember = [];
    let user = await PremiumUser.findOne({ Id: member })

    PushMember.push(client.users.cache.get(member))

    if (user) {
        user.isPremium = true
        user.premium.redeemedBy.push(client.users.cache.get(member))
        user.premium.redeemedAt = Date.now()
        user.premium.expiresAt = time
        user.premium.plan = plan
    
        user = await user.save({ new: true }).then(() => {
            client.premiums.set(client.users.cache.get(member).id, user)
          /*  message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('#303236')
                    .setTitle('Premium Changed')
                    .setDescription(`*Plan*: \`${plan}\`\n *Member*: \`${client.users.cache.get(member).tag}\``),
                ],
            }) */
        }).catch(() => {})
       
        PushMember = 0;
    } else {
        user = new PremiumUser({
            Id: member,
            isPremium: true,
            premium: {
                redeemedBy: PushMember,
                redeemedAt: Date.now(),
                expiresAt: time,
                plan: plan,
            },
        });
        user = await user.save({ new: true }).then(() => {
            client.premiums.set(client.users.cache.get(member).id, user)
          /*    message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('#303236')
                    .setTitle('Premium Given')
                    .setDescription(`*Plan*: \`${plan}\`\n *Member*: \`${client.users.cache.get(member).tag}\``),
                ],
            }) */
        }).catch(() => {}) 

        PushMember = 0;
    }
``
    const embeddm = new MessageEmbed()
    .setColor('#303236')
    .setThumbnail('https://cdn.discordapp.com/attachments/890262013484363806/975212551837216788/unknown.png?siz`e=4096')
    .setTitle(`${plan} Premium Subscription Renewed`)
    .setDescription(`• *User*: \`${client.users.cache.get(member).tag}\` • *Plan*: \`${plan}\`\n • *Expires at*: \`${moment(time).format('dddd, MMMM Do YYYY')}\` 
    • *Discord Server*: [https://discord.gg/N28ZrdrhtA](https://discord.gg/N28ZrdrhtA) \n • *Store*: [https://mecute.tebex.io](https://mecute.tebex.io)`)
    .setTimestamp()

    const embed = new MessageEmbed()
      .setColor('#303236')
      .setDescription(`<@${client.users.cache.get(member).id}> • *id*: ${client.users.cache.get(member).id} • *User*: \`${client.users.cache.get(member).tag}\` • *Plan*: \`${plan}\` • *Expires at*: \`${moment(time).format('dddd, MMMM Do YYYY')}\``)
      .setTimestamp()

      message.channel.send(`<@${client.users.cache.get(member).id}> • *id*: \`${client.users.cache.get(member).id}\` • *User*: \`${client.users.cache.get(member).tag}\` • *Plan*: \`${plan}\` • *Expires at*: \`${moment(time).format('dddd, MMMM Do YYYY')}\``)
      client.users.fetch(args[1], false).then((user) => {
        user.send({ embeds: [embeddm] }).catch(() => {});
       });
  }
}