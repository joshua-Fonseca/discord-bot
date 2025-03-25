// https://discordjs.guide/popular-topics/intents.html#privileged-intents
// https://discord.com/developers/docs/events/gateway

require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");
const event_handlers = require("./handlers/event_handlers");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

event_handlers(client);

client.login(process.env.TOKEN);