const path = require("path");
const fs = require("fs");

const controlMain = {
    home : (req, res) => {
        res.render('./main/home')
    },
    contact : (req, res) => {
        res.render('./main/contacts')
    }

};

const controlMethods = {
    leerJSON : (archivo) => {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/' + archivo), "utf8"));
    }
};

module.exports = {controlMain, controlMethods};