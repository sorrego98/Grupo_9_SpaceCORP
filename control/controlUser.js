const path = require("path");

const controlUser = {
    login : (req, res) => {
        let htmlPath = path.resolve(__dirname, '../src/views/user/login.html');
        res.sendFile(htmlPath);
    },
    register : (req, res) => {
        let htmlPath = path.resolve(__dirname, '../src/views/user/register.html');
        res.sendFile(htmlPath);
    },
};

module.exports = controlUser;