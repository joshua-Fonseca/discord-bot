// deals with slash command registration
// run it when either adding or updating commands
// temporary

require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "hey",
        description: "replies with hey!",
    },
    {
        name: "ping",
        description: "pong!",
    },
    {
        name: "embed",
        description: "i send an embed",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body : commands });
        console.log("Slash commands were registered successfully");
    } catch (error) {
        console.log("There was an error: ", error);
    }
})();