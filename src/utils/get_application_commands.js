module.exports = async (client, guild_id) => {
    let application_commands;

    if (guild_id) {
        const guild = await client.guilds.fetch(guild_id);
        console.log("GUILDDDDDDDDDDDD:",guild.name);
        console.log("guild commands:",guild.commands);
        application_commands = guild.commands;
    } else {
        application_commands = await client.application.commands;
    }

    await application_commands.fetch();

    // console.log(application_commands);

    return application_commands;
}