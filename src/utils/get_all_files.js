const fs = require("fs");
const path = require("path");

module.exports = (directory, folders_only = false) => {
    let filenames = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });
    // console.log(files);

    for (const file of files) {
        const filepath = path.join(directory, file.name);

        if (folders_only) {
            if (file.isDirectory()) {
                filenames.push(filepath);
            }
        } else {
            if (file.isFile()) {
                filenames.push(filepath);
            }
        }
    }

    return filenames;
};