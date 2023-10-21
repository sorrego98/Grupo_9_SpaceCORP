const path = require("path");
const fs = require("fs");
const db = require('../database/models');

const controlMain = {
    home: (req, res) => {
        const Staff = db.Member.findAll();
        const Production = db.Production.findAll();
        const Galery = db.Galery.findAll();
        Promise.all([Staff, Production, Galery])
            .then(([allStaff, allProduction, allGalery]) => {
                res.render('./main/home', { allStaff, allProduction, allGalery })
            })
            .catch(error => res.send(error))        
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
    addImage: (req, res) => {
        res.render('./admin/home/add/add-image')
    },
    saveImage: (req, res) => {
        const imagename = req.body.imagename;
        const image = req.file.filename;
        db.Galery.create({
            name: imagename,
            image,
        })
            .then(() => {
                res.redirect('/admin/home/galery');
            })
            .catch(error => res.send(error))
    },
    addProduction: (req, res) => {
        res.render('./admin/home/add/add-production')
    },
    saveProduction: (req, res) => {
        const songname = req.body.songname;
        const artistname = req.body.artistname;
        const youtubeurl = req.body.youtubeurl;
        db.Production.create({
            songTitle: songname,
            artistName: artistname,
            youtubeUrl: youtubeurl
        })
            .then(() => {
                res.redirect('/admin/home/latestProductions');
            })
            .catch(error => res.send(error))
    },
    detailGalery: (req, res) => {
        const id = req.params.id;
        db.Galery.findByPk(id)
            .then(galery => {
                res.render('./admin/home/detail/detail-galery', { galery })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    detailMember: (req, res) => {
        const id = req.params.id;
        db.Member.findByPk(id)
            .then(member => {
                res.render('./admin/home/detail/detail-member', { member })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    detailProduction: (req, res) => {
        const id = req.params.id;
        db.Production.findByPk(id)
            .then(production => {
                res.render('./admin/home/detail/detail-production', { production })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modMembers: (req, res) => {
        const id = req.params.id;
        db.Member.findByPk(id)
            .then(member => {
                res.render('./admin/home/modify/modify-member', { member })
            })
            .catch(error => res.send(error))
    },
    alterMembers: (req, res) => {
        const id = req.params.id;
        const membername = req.body.membername;
        const jobname = req.body.jobname;
        const instagramname = req.body.instagramname;
        const instagramurl = req.body.instagramurl;
        const oldImage = req.body.oldImage;
        let lastImage;
        req.file ? lastImage = req.file.filename : lastImage = oldImage;
        db.Member.update(
            {
                name: membername,
                jobName: jobname,
                instagramName: instagramname,
                instagramUrl: instagramurl,
                image: lastImage
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/home/staff')
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modGalery: (req, res) => {
        const id = req.params.id;
        db.Galery.findByPk(id)
            .then(galery => {
                res.render('./admin/home/modify/modify-galery', { galery })
            })
            .catch(error => res.send(error))
    },
    alterGalery: (req, res) => {
        const id = req.params.id;
        const imagename = req.body.imagename;
        const oldImage = req.body.oldImage;
        let lastImage;
        req.file ? lastImage = req.file.filename : lastImage = oldImage;
        db.Galery.update(
            {
                name: imagename,
                image: lastImage
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/home/galery')
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modProduction: (req, res) => {
        const id = req.params.id;
        db.Production.findByPk(id)
            .then(production => {
                res.render('./admin/home/modify/modify-production', { production })
            })
            .catch(error => res.send(error))
    },
    alterProduction: (req, res) => {
        const id = req.params.id;
        const songname = req.body.songname;
        const artistname = req.body.artistname;
        const youtubeurl = req.body.youtubeurl;
        db.Production.update(
            {
                songTitle: songname,
                artistName: artistname,
                youtubeUrl: youtubeurl
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/home/latestProductions')
            })
            .catch(error => res.send("Error presente: " + error));
    },
    destroyMember: (req, res) => {
        const id = req.params.id;
        db.Member.destroy(
            { where: { id } }
        )
            .then(() => {
                return res.redirect('/admin/home/staff')
            })
    },
    destroyGalery: (req, res) => {
        const id = req.params.id;
        db.Galery.destroy(
            { where: { id } }
        )
            .then(() => {
                return res.redirect('/admin/home/galery')
            })
    },
    destroyProduction: (req, res) => {
        const id = req.params.id;
        db.Production.destroy(
            { where: { id } }
        )
            .then(() => {
                return res.redirect('/admin/home/latestProductions')
            })
    }
};

module.exports = { controlMain, controlMethods, controlDB };