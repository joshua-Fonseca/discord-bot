module.exports = {
    name: "ping",
    description: "desc pong",
    // dev_only: boolean,
    // test_only: boolean,
    // options: object[],
    // deleted: boolean,
    callback: (client, interaction) => {
        // interaction.reply("pong", client.ws.ping + "ms");
        interaction.reply("yo mama");
    }
};