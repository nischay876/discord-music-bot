const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Information about the bot",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `Commands of ${client.user.username}`,
              client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
              `To get info of each command type ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }help [Command]`
            ).setDescription(`${Commands.join("\n")}
  
            **[SUPPORT SERVER](${
    client.botconfig.SupportServer
  }) •  [MY DISCORD](https://discord.com/users/813561253175361558) • [INVITE](https://discord.com/oauth2/authorize?client_id=${
    client.botconfig.ClientID
  }&permissions=${
    client.botconfig.Permissions
  }&scope=bot%20${client.botconfig.Scopes.join("%20")}&redirect_url=${
    client.botconfig.Website
  }${client.botconfig.CallbackURL}&response_type=code) • [WEBSITE](${client.botconfig.Website})**`
);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | Unable to find that command.`);

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor(client.botconfig.EmbedColor)
        //.addField("Name", cmd.name, true)
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "command",
        description: "Get information on a specific command",
        value: "command",
        type: 3,
        required: false
      },
    ],
    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `Commands of ${client.user.username}`,
              client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
              `To get info of each command type ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }help [Command]`
            ).setDescription(`${Commands.join("\n")}
  
            **[Support Server](${
              client.botconfig.SupportServer
            }) •  [My Discord](https://discord.com/users/813561253175361558) • [Invite](https://discord.com/oauth2/authorize?client_id=${
              client.botconfig.ClientID
            }&permissions=${
              client.botconfig.Permissions
            }&scope=bot%20${client.botconfig.Scopes.join("%20")}&redirect_url=${
              client.botconfig.Website
            }${client.botconfig.CallbackURL}&response_type=code)**`
          );
              if (!args[0]) message.channel.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | Unable to find that command.`);
  
        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor(client.botconfig.EmbedColor)
          //.addField("Name", cmd.name, true)
          .addField("Aliases", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};