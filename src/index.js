// https://discordjs.guide/popular-topics/intents.html#privileged-intents
// https://discord.com/developers/docs/events/gateway

require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on("ready", (c) => {
    // console.log("ready");
    console.log(c.user.tag, "is online");
});

// https://discord.js.org/docs/packages/discord.js/14.18.0/Message:Class
client.on("messageCreate", (message) => {
    // console.log(message.content);

    if (message.author.bot) {
        return;
    }

    if (message.content === "hello") {
        message.reply("hello");
    }
    else {
        console.log(message.author.username, "said", message.content);
    }
})

client.login(process.env.TOKEN);