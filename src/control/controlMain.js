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

const controlDB ={
    listData: 1/* CREAR CODIGO PARA HACER LA BUSQUEDA DE DATOS, LISTADOS O DETALLES EN LA BD*/,
    createData: 1/* CREAR CODIGO PARA HACER LA INSERCIÓN DE REGISTROS EN LA BD*/,
    updateData: 1 /* CREAR CODIGO PARA HACER UNA ACTUALIZACION O MODIFICACIÓN EN LA BD*/,
    destroyData: 1 /* CREAR CODIGO PARA HACER ELIMINACIÓN EN LA BD*/
};

module.exports = {controlMain, controlMethods, controlDB};