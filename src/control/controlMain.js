const path = require("path");
const fs = require("fs");
const db = require('../database/models');

const controlMain = {
    home: (req, res) => {
        res.render('./main/home')
    },
    contact: (req, res) => {
        res.render('./main/contacts')
    }

};

const controlMethods = {
    leerJSON: (archivo) => {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/' + archivo), "utf8"));
    }
};

const controlDB = {
    staffList: (req, res) => {
        db.Member.findAll()
            .then(members => {
                res.render('./admin/home/list/list-staff', { members })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    galeryList: (req, res) => {
        db.Galery.findAll()
            .then(photos => {
                res.render('./admin/home/list/list-galeries', { photos })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    productionList: (req, res) => {
        db.Production.findAll()
            .then(latest => {
                res.render('./admin/home/list/list-productions', { latest })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    addMembers: (req, res) => {
        res.render('./admin/home/add/add-staff')
    },
    saveMembers: (req, res) => {
        const membername = req.body.membername;
        const jobname = req.body.jobname;
        const instagramname = req.body.instagramname;
        const instagramurl = req.body.instagramurl;
        const image = req.file.filename;
        db.Member.create({
            name: membername,
            jobName: jobname,
            image,
            instagramName: instagramname,
            instagramUrl: instagramurl

        })
            .then(() => {
                res.redirect('/admin/home/staff');
            })
            .catch(error => res.send(error))
    },



    createData: 1/* CREAR CODIGO PARA HACER LA INSERCIÓN DE REGISTROS EN LA BD*/,
    updateData: 1 /* CREAR CODIGO PARA HACER UNA ACTUALIZACION O MODIFICACIÓN EN LA BD*/,
    destroyData: 1 /* CREAR CODIGO PARA HACER ELIMINACIÓN EN LA BD*/
};

module.exports = { controlMain, controlMethods, controlDB };