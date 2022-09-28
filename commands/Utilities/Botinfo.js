const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    config: {
        name: "botinfo",
        description: "Show Bot Information!",
        category: "Utilities",
        accessableby: "member",
        aliases: ["stats"]
    },
    run: async (client, message, guild, args, user, language) => {

           // show lavalink uptime in a nice format
    const lavauptime = moment
    .duration(client.manager.nodes.values().next().value.stats.uptime)
    .format(" D[d], H[h], m[m]");
  // show lavalink memory usage in a nice format
  const lavaram = (
    client.manager.nodes.values().next().value.stats.memory.used /
    1024 /
    1024
  ).toFixed(2);
  const lavacores = (
    client.manager.nodes.values().next().value.stats.cpu.cores).toFixed(2);
  // sow lavalink memory alocated in a nice format
  const lavamemalocated = (
    client.manager.nodes.values().next().value.stats.memory.allocated /
    1024 /
    1024
  ).toFixed(2);

  let guilds = client.guilds.cache.size;
  let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  let channels = client.channels.cache.size;

        
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${guilds}
          Users     :: ${members}
          Channels  :: ${channels}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${lavauptime}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
        const llStats = stripIndent`
        Uptime    :: ${lavauptime}
        RAM       :: ${lavaram}
        Cores     :: ${lavacores}
        Playing   :: ${client.manager.nodes.values().next().value.stats.playingPlayers} out of ${client.manager.nodes.values().next().value.stats.players}
      `;
    
        const embed = new MessageEmbed()
        .setTitle('Bot\'s Statistics')
        .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .addField('Lavalink', `\`\`\`asciidoc\n${llStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
    }
}