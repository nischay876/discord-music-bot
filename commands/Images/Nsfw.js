const superagent = require("superagent")
const akaneko = require("akaneko");
const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
const talkedRecently = new Set();

module.exports = { 
    config: {
        name: "nsfw",
        description: "nsfw images",
        accessableby: "Member",
        category: "Images",
    },
    run: async (client, message, args, prefix) => {
        const answer = args.join(" ");

        let nonnsfw = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(`**:x: This Command can be used in nsfw channels only**`)

        if(!message.channel.nsfw) return message.channel.send({ embeds: [nonnsfw] });
    
        let timeembed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle("Don't Spam Timeout 3 Seconds")
        .setDescription(`Why So Horny Just Wait For 3 Seconds To Re-use Any NSFW Command!`)
    
        if (talkedRecently.has(message.author.id)) {
        message.delete();
        message.channel.send({ embeds: [timeembed] })  .then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })
        } else {
        if (!answer) {
          message.delete();
          const blank = new Discord.MessageEmbed()
            .setTitle(" NSFW Commands 🔞")
            .setColor(client.color)
            .addField(`nsfw`, `This embed.`, true)
            .addField(`nsfw ass`, `Send ass image.`, true)
            .addField(`nsfw hass`, `Send hentai ass image.`, true)
            .addField(`nsfw pussy`, `Send pussy image.`, true)
            .addField(`nsfw hpussy`, `Send hentai pussy image.`, true)
            .addField(`nsfw hentai`, `Send hentai image.`, true)
            .addField(`nsfw holo`, `Send holo image.`, true)
            .addField(`nsfw lewd`, `Send lewd image.`, true)
            .addField(`nsfw thigh`, `Send thigh image.`, true)
            .addField(`nsfw hthigh`, `Send hentai thigh image.`, true)
            .addField(`nsfw gif`, `Send porn gif.`, true)
            .addField(`nsfw hgif`, `Send hentai porn gif.`, true)
            .addField(`nsfw 4k`, `Send 4k porn image.`, true)
            .addField(`nsfw anal`, `Send anal image.`, true)
            .addField(`nsfw boobs`, `Send boobs image.`, true)
            .addField(`nsfw hboobs`, `Send hentai boobs image.`, true)
            .addField(`nsfw foxgirl`, `Send foxgirl image.`, true)
            .addField(`nsfw wild`, `Send gone wild image.`, true)
            .addField(`nsfw neko`, `Send neko girl image.`, true)
            .addField(`nsfw hneko`, `Send hentai neko image.`, true)
            .addField(`nsfw bdsm`, `Send hentai bdsm image.`, true)
            .setFooter("Nsfw command 🔞");
    
          message.channel.send({ embeds: [blank] });
        } else if (answer == "ass") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "ass" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
                message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "pussy") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "pussy" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
          } else if (answer == "neko") {
            message.delete();
            superagent
              .get("https://nekobot.xyz/api/image")
              .query({ type: "neko" })
              .end((err, response) => {
                //message.channel.send(response.body.message);
                const embed = new Discord.MessageEmbed()
                  .setColor(client.color)
                  .setFooter("Nsfw command 🔞")
                  .setImage(response.body.message);
                message.channel.send({ embeds: [embed] });
              });
            } else if (answer == "hneko") {
              message.delete();
              superagent
                .get("https://nekobot.xyz/api/image")
                .query({ type: "hneko" })
                .end((err, response) => {
                  //message.channel.send(response.body.message);
                  const embed = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setFooter("Nsfw command 🔞")
                    .setImage(response.body.message);
                  message.channel.send({ embeds: [embed] });
                });             
        } else if (answer == "hentai") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "hentai" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "holo") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "holo" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "lewd") {
            message.delete()
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setFooter("Nsfw command 🔞")
            .setImage(await akaneko.lewdNeko());
          message.channel.send({ embeds: [embed] });
        } else if (answer == "hass") {
          message.delete()
          const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setFooter("Nsfw command 🔞")
          .setImage(await akaneko.nsfw.ass());
        } else if (answer == "bdsm") {
          message.delete()
          const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setFooter("Nsfw command 🔞")
          .setImage(await akaneko.nsfw.bdsm());  
        message.channel.send({ embeds: [embed] });
        } else if (answer == "hpussy") {
          message.delete()
          const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setFooter("Nsfw command 🔞")
          .setImage(await akaneko.nsfw.pussy());
        message.channel.send({ embeds: [embed] });
        } else if (answer == "hthigh") {
          message.delete()
          const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setFooter("Nsfw command 🔞")
          .setImage(await akaneko.nsfw.thighs());
        message.channel.send({ embeds: [embed] });
      } else if (answer == "hgif") {
        message.delete()
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setFooter("Nsfw command 🔞")
        .setImage(await akaneko.nsfw.gifs());
      message.channel.send({ embeds: [embed] });    
        } else if (answer == "thigh") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "thigh" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "gif") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "pgif" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "4k") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "4k" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "foxgirl") {
            message.delete()
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setFooter("Nsfw command 🔞")
            .setImage(await akaneko.nsfw.foxgirl());
          message.channel.send({ embeds: [embed] });
        } else if (answer == "anal") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "anal" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "boobs") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "boobs" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "wild") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "gonewild" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else if (answer == "hboobs") {
          message.delete();
          superagent
            .get("https://nekobot.xyz/api/image")
            .query({ type: "hboobs" })
            .end((err, response) => {
              //message.channel.send(response.body.message);
              const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setFooter("Nsfw command 🔞")
                .setImage(response.body.message);
              message.channel.send({ embeds: [embed] });
            });
        } else {
          const wrongarr = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Error!")
            .setDescription(
              `command not in list, do **nsfw** to see all nsfw commands`
            )
            .setColor(client.color)
            .setFooter("Nsfw command 🔞");
    
          message.channel.send({ embeds: [wrongarr] });
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        talkedRecently.delete(message.author.id);
        }, 3000); }

    }
}