// https://discordjs.guide/popular-topics/intents.html#privileged-intents
// https://discord.com/developers/docs/events/gateway

require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

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
    if (message.author.bot) {
        return;
    }

    // console.log(message.content);

    if (message.content === "hello") {
        message.reply("hello");
    } else if (message.content === "embed") {
        const embed = new EmbedBuilder()
            .setTitle("Embed title")
            .setDescription("This is an embed description")
            .setColor("Random")
            .addFields({
                name: "Field title",
                value: "Some random value",
                inline: true
            }, {
                name: "Field title 2",
                value: "Some random value 2",
                inline: true
            });
            message.channel.send({ embeds: [embed] });
    } else {
        console.log(message.author.username, "said", message.content);
    }
})

// slash commands
client.on('interactionCreate', async (interaction) => {
    // button stuff
    try {
        if (interaction.isButton()) {
            await interaction.deferReply({ ephemeral: true });
    
            const role = interaction.guild.roles.cache.get(interaction.customId);
    
            if (!role) {
                interaction.editReply({
                    content: "I couldn't find that role",
                })
                return;
            }
    
            const has_role = interaction.member.roles.cache.has(role.id);
    
            if (has_role) {
                await interaction.member.roles.remove(role);
                await interaction.editReply(`The role ${role} has been removed`); // have to use template literal, thats just how to dispaly the role correctly
                return;
            }
    
            await interaction.member.roles.add(role);
            await interaction.editReply(`The role ${role} has been added`); // have to use template literal, thats just how to dispaly the role correctly
        }
    } catch (error) {
        console.log(error);
    }

    // slash command stuff
    if(interaction.isCommand()) {
        console.log(interaction.user.username, "used the slash command /" + interaction.commandName);
        if (interaction.commandName === "hey") {
            interaction.reply("hey");
        } else if (interaction.commandName === "ping") {
            interaction.reply("pong");
        } else if (interaction.commandName === "embed") {
            // chain methods to define the embed
            const embed = new EmbedBuilder()
                .setTitle("Embed title")
                .setDescription("This is an embed description")
                .setColor("Random")
                .addFields({
                    name: "Field title",
                    value: "Some random value",
                    inline: true
                }, {
                    name: "Field title 2",
                    value: "Some random value 2",
                    inline: true
                });
                interaction.reply({ embeds: [embed] });
        }
    }
})

client.login(process.env.TOKEN);