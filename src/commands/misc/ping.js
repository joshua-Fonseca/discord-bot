module.exports = {
    name: "ping",
    desription: "desc pong",
    // dev_only: boolean,
    // test_only: boolean,
    // options: object[],
    callback: (client, interaction) => {
        interaction.reply("pong", client.ws.ping + "ms");
    }
};