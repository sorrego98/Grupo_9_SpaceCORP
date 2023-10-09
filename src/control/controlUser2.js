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

      User.findAll(
        //{include: [{association: 'roles'}]}
        )
        .then((users) => {
      //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult
      
      console.log("Estoy en el control2")
      console.log(users)

      const validacionesLogin = [
        body('email').isEmail().withMessage('Agregar un email válido'),
        body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres')
        ,
         body('email').custom( (value) =>{
           for (let i = 0; i < users.length; i++) {
               if (users[i].email == value) {
                   return true    
               }
           }
           return false
         }).withMessage('Usuario no se encuentra registrado...')
         ,
      
         //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
         body('password').custom( (value, {req}) =>{
             for (let i = 0; i < users.length; i++) {
                 if (users[i].email == req.body.email) {
                     if(bcrypt.compareSync(value, users[i].password)){
                       return true;
                     }else{
                       return false;
                     }
                 }
             } 
         }).withMessage('Usuario o contraseña no coinciden')
        ]      
      
      console.log("validaciones",validacionesLogin)
      
      let errors = validationResult(req);
      
      let usuarioLogueado = [];

      if(req.body.email != '' && req.body.password != ''){
        usuarioLogueado = users.filter(function (user) {
          return user.email === req.body.email  
        });
        console.log("check1",usuarioLogueado);

        //Aquí verifico si la clave que está colocando es la misma que está hasheada en la Base de datos - El compareSync retorna un true ó un false
        if(bcrypt.compareSync(req.body.password, usuarioLogueado[0].password) === false){
          usuarioLogueado = [];
        }
      } 
      console.log("check2",usuarioLogueado);
      console.log("check3",usuarioLogueado.length);
      //console.log("check4", usuarioLogueado[0].password)
        //return res.send(usuarioLogueado);
        //Aquí determino si el usuario fue encontrado ó no en la Base de Datos
        if (usuarioLogueado.length === 0) {
          return res.render(path.resolve(__dirname, '../views/auth/login'),{ errors: [{ msg: "Credenciales invalidas" }] });
        } else {
          //Aquí guardo en SESSION al usuario logueado
          req.session.usuario = usuarioLogueado[0];
        }
        //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
        if(req.body.recordarme){
          res.cookie('email',usuarioLogueado[0].email,{maxAge: 1000 * 60 * 60 * 24})
        }
        return res.redirect('/auth/profile'); 
      })
    },

  // loginProcess: (req, res) => {
  //     User.findAll({include: [{association: 'roles'}]})
  //       .then( users => {

  //     const errors = validationResult(req);
  //     if (errors.isEmpty()) {
  //       let usuarioLogueado = users.find(usuario => usuario.email == req.body.email)
  //       delete usuarioLogueado.password;
  //       req.session.usuario = usuarioLogueado;  //Guardar del lado del servidor

  //       //Aquí voy a guardar las cookies del usuario que se loguea
  //       if (req.body.recordarme) {
  //         res.cookie('email', usuarioLogueado.email, { maxAge: 1000 * 60 * 60 * 24 })
  //       }
  //       return res.redirect('/auth/profile');

  //     } else {
  //       //Devolver a la vista los errores
  //       res.render(path.resolve(__dirname, '../views/auth/login'), { errors: errors.mapped(), old: req.body });
  //     }})
  //   },

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
