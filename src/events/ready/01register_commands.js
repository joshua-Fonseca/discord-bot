const { server_id } = require("../../../config.json"); // bottom-up
const compare_commands = require("../../utils/compare_commands");
const get_application_commands = require("../../utils/get_application_commands");
const get_local_commands = require("../../utils/get_local_commands");

module.exports = async (client) => {
    try {
        const local_commands = get_local_commands();
        // console.log("local commands:\n", local_commands);
        
        const application_commands = await get_application_commands(client, server_id);
        // console.log("app commands:\n", application_commands);

        // loop through local commands, comparing them to application comamnds for any differences
        console.log("before loop");
        for (const local_command of local_commands) {
            const { name, description, options } = local_command;

            const existing_command = await application_commands.cache.find(
                (cmd) => cmd.name === name
            )
            
            if (existing_command) {
                console.log("if existing_command");
                // if a command is set to be deleted but exists, delete it
                if (local_command.deleted) {
                    await application_commands.delete(existing_command.id);
                    console.log("Deleted command:", name);
                    continue;
                }

                // if difference spotted, edit command to be the local version
                if (compare_commands(existing_command, local_command)) {
                    await application_commands.edit(existing_command.id, {
                        description,
                        options
                    });

                    console.log("Edited command:", name);
                }
            } else {
                console.log("else");
                // unlikely, but in the event a newly added local command is set to be deleted
                if (local_command.deleted) {
                    console.log("Skipping command", name, "as it's set to be deleted");
                    continue;
                }

                // this part will run if the command does not exist and is not set to be deleted
                await application_commands.create({
                    name,
                    description,
                    options
                });

                console.log("Registered command:", name);
            }
        }
    } catch (error) {
        console.log("There was an error:", error);
    }
};