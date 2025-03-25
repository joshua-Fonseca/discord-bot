const { server_id } = require("../../../config.json"); // bottom-up
const get_local_commands = require("../../utils/get_local_commands");

module.exports = (client) => {
    const local_commands = get_local_commands();
    console.log(local_commands);
};