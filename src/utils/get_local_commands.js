// local because another function will grab commands from the discord bot

const path = require("path");
const get_all_files = require("./get_all_files");

module.exports = (exceptions) => {
    let local_commands = [];

    const command_categories = get_all_files(path.join(__dirname, "..", "commands"), true);

    console.log("command_categories: ", command_categories, "\n");

    // similar to event_handlers.js, that was done first
    for (const command_category of command_categories) {
        const command_files = get_all_files(command_category);

        console.log("command_files:", command_files);

        
    }

    return local_commands;
};