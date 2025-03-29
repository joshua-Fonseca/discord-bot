const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "ban",
    description: "bans a member",
    // dev_only: boolean,
    // test_only: boolean,
    options: [
        {
            name: "target-user",
            description: "the user to ban!",
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: "reason",
            description: "the reason for ban",
            required: false,
            type: ApplicationCommandOptionType.String
        }
    ],
    permissions_required: [PermissionFlagsBits.Administrator],
    bot_permissions: [PermissionFlagsBits.Administrator],
    callback: (client, interaction) => {
        interaction.reply("yer done");
    }
};