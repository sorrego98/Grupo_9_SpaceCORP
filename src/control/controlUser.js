const path = require("path");
const fs = require('fs');
const controlMain = require('./controlMain');
const bcrypt = require('bcryptjs');

const db = require('../database/models')
const User = db.Users

//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult, check, body } = require('express-validator');
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
    let band = true; //para saber que hay errores
    let email = req.body.email;
    let password = req.body.password;
    let remindMe = req.body.recordarme;
    let Results = validationResult(req);
    let errors = Results.errors;
    console.log(errors)
    if(remindMe){
      res.cookie('email',email,{maxAge: 1000 * 60 * 60 * 24})
      
    }                  
    if(Results.isEmpty()){
      User.findOne({
        include: [{association: 'roles'}],
        where:{email}
      })
      .then(user => {
        /*defino mi propio tipo de error, en caso de que  en la bdd no se consigan datos*/
        errors = [{msg:"usuario y/o contraseña inválidos."}]
        console.log(errors)
        if(user){
          if(bcrypt.compareSync(password, user.password) === true){
            req.session.usuario = user; 
            return res.status(200).redirect('/auth/profile');            
          
          }

        }
        return res.render(path.resolve(__dirname, '../views/auth/login'),{ errors});

      })  

    }else{      
      res.clearCookie('email');
      return res.render(path.resolve(__dirname, '../views/auth/login'),{ errors});

    }

  }, 

      // User.findAll(
      //   {include: [{association: 'roles'}]}
      //   )
      //   .then((users) => {
      // //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult
      // let errors = validationResult(req);      
      // let usuarioLogueado = [];
      // if(req.body.email != '' && req.body.password != ''){
      //   usuarioLogueado = users.filter(function (user) {
      //     return user.email === req.body.email  
      //   });
      //   //Aquí verifico si la clave que está colocando es la misma que está hasheada en la Base de datos - El compareSync retorna un true ó un false
      //   if(bcrypt.compareSync(req.body.password, usuarioLogueado[0].password) === false){
      //     usuarioLogueado = [];
      //   }
      // } 
      //   //Aquí determino si el usuario fue encontrado ó no en la Base de Datos
      //   if (usuarioLogueado.length === 0) {
      //     return res.render(path.resolve(__dirname, '../views/auth/login'),{ errors: [{ msg: "Usuario y contraseña no coinciden" }] });
      //   } else {
      //     //Aquí guardo en SESSION al usuario logueado
      //     req.session.usuario = usuarioLogueado[0];
      //   }
      //   //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
      //   if(req.body.recordarme){
      //     res.cookie('email',usuarioLogueado[0].email,{maxAge: 1000 * 60 * 60 * 24})
      //   }
      //   return res.redirect('/auth/profile'); 
      // })
    // },

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
