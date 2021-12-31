module.exports = {
  Admins: ["813561253175361558"], //Admins of the bot
  ExpressServer: true,//If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || "", //Default prefix, Server Admins can change the prefix
  Port: 80, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/aYBB9eXe2g", //Support Server Link
  Token: process.env.Token || "", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands", "guilds.join"],//Discord OAuth2 Scopes
  ServerDeafen : true,//If you want bot to stay deafened
  DefaultVolume: 80, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": true, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "oggyiscute", //A Secret like a password
  IconURL:
    "https://i.imgur.com/CW6sCf8.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  EmbedColor: "#303236", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
  Permissions: 6777204297, //Bot Inviting Permissions
  Website: process.env.Website || "", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  Presence: {
    status: "online", // You can show online, idle, and dnd
    name: process.env.Presencename || "", // The message shown
    type: "PLAYING", // PLAYING, WATCHING, LISTENING, STREAMING
  },

     //Lavalink
     Lavalink: {
      host: "Lavalink Server",
      host: process.env.Lavalink_host || "",
      port: 443,
      pass: process.env.Lavalink_pass || "",
      secure: true,
      retryDelay: 5000, // Delay for reconnect in ms
      retryAmount: 1000000000000, // Retry amout if the lavalink is dead and/or restarting.
    },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "", //Spotify Client Secret
  },
};
