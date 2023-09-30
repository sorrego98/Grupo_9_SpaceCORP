const fs = require('fs');
const path = require('path');
let archivoUsers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
const db = require('../database/models');
const User = db.Users;
        
module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.usuario = false;
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        let email = req.cookies.email
        User.findOne({
            where: {
               email: email
            }
        })
        .then(usuario =>{
        //let usuario = archivoUsers.find(usuario => usuario.email == req.cookies.email)
        //return res.send(usuario);
        //delete usuario.password;
        req.session.usuario = usuario;
        res.locals.usuario = usuario;
        return next();
        })
    }else{
        return next();
    }
}