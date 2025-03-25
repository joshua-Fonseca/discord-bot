// https://discordjs.guide/popular-topics/intents.html#privileged-intents
// https://discord.com/developers/docs/events/gateway

// this file is for sending a message to pick/remove roles

require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const roles = [
    {
        id: "1353209203040190545",
        label: "pink"
    },
    {
        id: "1353209360783904799",
        label: "brown"
    },
]

client.on("ready", async (c) => {
    try {
        const channel = await client.channels.cache.get("803836022374793219");

        if (!channel) {
            return;
        }

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary))
        });

        await channel.send({
            content: "Claim or remove a role",
            components: [row] // a row can have maximum 5 buttons
        });

        process.exit();

    } catch (error) {
        console.log(error);
    }
    // console.log("ready");
    console.log(c.user.tag, "is online");
});

client.login(process.env.TOKEN);