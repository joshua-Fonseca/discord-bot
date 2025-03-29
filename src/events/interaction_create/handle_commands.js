const { devs, server_id } = require("../../../config.json");
const get_local_commands = require("../../utils/get_local_commands");

module.exports = async (client, interaction) => {
    if (!interaction.is_chat_input_command())  {
        console.log("am not chat input command");
        return;
    }

    const local_commands = get_local_commands();

    console.log ("Local cmd:", local_commands);

    try {
        const command_object = local_commands.find((cmd) =>
            cmd.name === interaction.command_name
        );

        if (!command_object) {
            return;
        }

        // check if command object is dev only
        if (command_object.dev_only) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "only developers are allowed to run this cmd",
                    ephemeral: true // this makes it so only the user writing the command sees it
                });
                return;
            }
        }

        if (command_object.test_only) {
            if (!(interaction.guild.id === server_id)) {
                interaction.reply({
                    content: "This command cannot be ran here.",
                    ephemeral: true
                });
                return;
            }
        }

        // if (command_object.permissions_required?.length) {
        //     for (const permission of command_object.permissions_required) {
        //         if (!interaction.member.permissions.has(permission)) {
        //             interaction.reply ({
        //                 content: "Not enough permissions",
        //                 ephemeral: true
        //             });
        //             return;
        //         }
        //     }
        // }

        if (command_object.bot_permissions?.length) {
            for (const permission of command_object.bot_permissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply ({
                        content: "I don't have enough permissions",
                        ephemeral: true
                    });
                    return;
                }
            }
        }

        await command_object.callback(client, interaction);
    } catch (error) {
        console.log("There was an error:", error);
    }
}   