const path = require("path");
const get_all_files = require("../utils/get_all_files");

module.exports = (client) => {
    const event_folders = get_all_files(path.join(__dirname, "..", "events"), true);

    console.log("event folders: ", event_folders, "\n");

    for (const event_folder of event_folders) {
        const event_files = get_all_files(event_folder);

        // sort files in folders, so other events have priority. sorts in ascending order.
        event_files.sort((a, b) => a > b);

        console.log("event files: ", event_files);

        const event_name = event_folder.replace(/\\/g, "/").split("/").pop();

        console.log("event name is: ", event_name, "\n");

        client.on(event_name, async (arg) => {
            for (const event_file of event_files) {
                const event_function = require(event_file);
                // console.log(event_function);
                await event_function(client, arg);
            }
        })
    }
};