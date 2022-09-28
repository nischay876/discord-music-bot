# DISCORD.JS-MEMES
This is a powerful module that allows you to generates randomly memes, to start this porcess you have to type in your shell:
```yarn
npm i discord.js-memes
```
Then you have to put in your command a constant called meme and require this npm like this: 
```js
const meme = require("discord.js-memes")
```
To finish if you want to generate a random meme just type this in your commmand: 
```js
const Discord = require("discord.js")
const {eMeme, sMeme, all} = require("discord.js-memes")

const all = new sMeme()
.setType(1)
 //generates a random meme in spanish

const embed = new Discord.MessageEmbed()
.setTitle("MEME")
.setImage(all)
.setFooter({text: "Powered by discord.js-memes"})

message.channel.send({embeds: [embed]})

```
There are more types of memes: 
```js
const total = new sMeme()
.setType(1) //for all the memes only in spanish

const famousmemes = new sMeme()
.setType(2) //for famous people memes in spanish

const cinemamemes = new sMeme()
.setType(3) //for cinema memes in spanish

const english = new eMeme()
.setType(1) //for all the english memes

const efamous = new eMeme()
.setType(2) //for only memes about famous people in english

const allmemes = all() //for all the memes of this module in spanish or in english

//Coming soon more types of memes and new types of memes in english
```
If you want to report an issue or a bug you can go to this GitHub link and report it you can [clik here](https://github.com/PabloRNC/npm-discordjs-memes/issues) to report it and I will fixed as fast as I can




