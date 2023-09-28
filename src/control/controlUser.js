const path = require("path");
const fs = require('fs');
const controlMain = require('./controlMain');
const bcrypt = require('bcryptjs');

const db = require('../database/models')
const User = db.Users

//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult } = require('express-validator');
const { decrypt } = require("dotenv");

const controlUser = {
  register: (req, res) => {
    res.render('../views/auth/register');
  },

  create: (req, res) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.render(path.resolve(__dirname, '../views/auth/register'), {
        errors: errors.errors,  old: req.body
      });
    }

      User.create({include: [{association: 'roles'}],
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        userName: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        imageProfile: req.file ? req.file.filename : "",
        roleId: 2,
      })
      .then(() => {
          return  res.redirect('/auth/login');
      })
      .catch(error => console.log(error));
    },
  login: (req, res) => {
    res.render('../views/auth/login')
  },
  loginProcess: (req, res) => {
      User.findAll({include: [{association: 'roles'}]})
        .then( users => {

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        let usuarioLogueado = users.find(usuario => usuario.email == req.body.email)
        delete usuarioLogueado.password;
        req.session.usuario = usuarioLogueado;  //Guardar del lado del servidor

        //Aquí voy a guardar las cookies del usuario que se loguea
        if (req.body.recordarme) {
          res.cookie('email', usuarioLogueado.email, { maxAge: 1000 * 60 * 60 * 24 })
        }
        return res.redirect('/auth/profile');

      } else {
        //Devolver a la vista los errores
        res.render(path.resolve(__dirname, '../views/auth/login'), { errors: errors.mapped(), old: req.body });
      }})
    },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('email');
    res.redirect('/auth/login')
  },
  profile: (req, res) => {
    
    return res.render('./auth/profile', {
      user: req.session.usuario
    });
  },
  editarPerfil: function(req, res) {
    console.log("datos de la sesion:\n",req.session)
    User.findByPk(req.session.usuario.id, 
      {include: [{association: 'roles'}]})
    .then( user =>{
     /* user.password = decrypt.hashSync(user.password, 10)
      console.log(decrypt.hashSync(user.password, 10))*/
      //res.json(user)  
      res.render('./auth/modify-user', { user }) 
    })
},
modificarPerfil: function (req,res) {
  const id = parseInt(req.session.usuario.id);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const oldImage = req.body.oldImage;
  let lastImage;
  req.file ? lastImage=req.file.filename : lastImage=oldImage;

      User.findByPk(id)
      .then((result) => {
        const usuario = {
            id : id,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: bcrypt.hashSync(password, 10),
            email: email,
            imageProfile: lastImage
        }
          if (result){
            User.update(                
              usuario,
              {
                  where: { id: id },
              })
            .then(() => {
              req.session.usuario = usuario;
              res.locals.usuario = usuario;	
              res.redirect("/auth/profile");
            })
            .catch(error =>{
              res.send(error)
            })
          }
}
)}
} 

module.exports = controlUser;
