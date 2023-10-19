const path = require("path");
const fs = require('fs');
const controlMain = require('./controlMain');
const bcrypt = require('bcryptjs');

const db = require('../database/models')
const User = db.Users
const Roles = db.Roles

//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const {validationResult} = require('express-validator');
const { decrypt } = require("dotenv");

const controlUser = {

  register: (req, res) => {
    res.render('../views/auth/register');
  },

  create: (req, res) => {
    let errors = validationResult(req);
    const firstName= req.body.first_name;
    const lastName= req.body.last_name;
    const userName= req.body.user_name;
    const password= bcrypt.hashSync(req.body.password, 10);
    const email= req.body.email;
    const imageProfile= req.file ? req.file.filename : ""
    if(errors.isEmpty()) {

      User.findOne( {where:{email: email}})
      .then( user => {
        
        if (!user){
          Roles.findOne( {where:{role_name:"USUARIO"}})
          .then( role => {
            if(role){
              const usuario ={
                firstName,
                lastName,
                userName,
                password,
                email,
                roleId: role
              }
              
              if (imageProfile != ""){
                console.log("añadiendo imagen al objeto");
                Object.assign(usuario,{
                  imageProfile,
                })
                
              }
  
              User.create(usuario)
              .then(() => {
                return  res.redirect('/auth/login');
              })
              // errores en la creación del usuario
              .catch(error => console.log(error));
              
  
            }
          })
          // errores en la búsqueda del rol      
          .catch(error => console.log(error));

        }else{
          return  res.render(path.resolve(__dirname, '../views/auth/register'),{errors: [{msg: 'Usuario ya se encuentra registrado'}]});

        }

      })

    }else{
      res.render(path.resolve(__dirname, '../views/auth/register'),  {errors: errors.errors, old: req.body})
    }
  },

  login: {
    show: (req, res) => res.render('../views/auth/login'),

    enterSession:(req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      let remindMe = req.body.recordarme;
      let Results = validationResult(req);
      
      if(remindMe){ res.cookie('email',email,{maxAge: 1000 * 60 * 60 * 24})}

      if(Results.isEmpty()){
        User.findOne({
          include: [{association: 'roles'}],
          where:{email}
        })
  
        .then(user => {
          if(user){
            if(bcrypt.compareSync(password, user.password) === true){
              req.session.usuario = user;

              if (user.roles.roleName == "ADMINISTRADOR"){
                return res.status(200).redirect('/admin');

              }else{
                return res.status(200).redirect('/auth/profile');            

              }
            
            }
          }

          /*defino mi propio tipo de error, en caso de que  en la bdd no se consigan datos*/
          errors = [{msg:"usuario y/o contraseña inválidos."}]
          return res.render(path.resolve(__dirname, '../views/auth/login'),{ errors });
  
        })  
  
      }else{
        res.clearCookie('email');
        return res.render(path.resolve(__dirname, '../views/auth/login'),{ errors : Results.errors });
  
      }
  
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('email');
    res.redirect('/auth/login')
  },

  profile: {
    show: (req, res) => res.render('./auth/profile', {user: req.session.usuario}),

    edit: function (req,res) {
      const id = parseInt(req.session.usuario.id);
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const oldImage = req.body.oldImage;
      let lastImage = req.file ? req.file.filename : oldImage;
      console.log("ingreso")
      
      const usuario = {
        firstName: firstName,
        lastName: lastName,
        imageProfile: lastImage          
      }
      
      User.findByPk(id)
      .then((user) => {
        console.log("-----------------\n" + user + "\n-----------------\n")
        if (user){
          console.log("usuario")
          
          console.log(user.firstName,firstName,user.lastName,lastName,user.imageProfile, lastImage)
          if (user.firstName !== firstName || user.lastName !== lastName || user.imageProfile !== lastImage){
            
            console.log("validación")
            User.update(   
              usuario,
              {
                where: { id: id },
              })
              .then(() => {
              console.log("update")
              User.findByPk(id,{
                include: [{association: 'roles'}]})
                .then((lastUser) => {
                  
                console.log("actualizado")
                req.session.usuario = lastUser;
                return res.redirect("/auth/profile");

              })
              .catch(error =>{
                res.send(error)
              })

            })
            .catch(error =>{
              res.send(error)
            })
              
          }else {
            console.log("datos iguales");
            return res.redirect("/auth/profile");
          }
          
        }
      })
      .catch(error =>{
        console.log("error" + error)
        res.send(error)
      })
    }
  },
  

  // editarPerfil: function(req, res) {
  //   console.log("datos de la sesion:\n",req.session)
  //   User.findByPk(req.session.usuario.id, 
  //     {include: [{association: 'roles'}]})
  //   .then( user =>{
  //    /* user.password = decrypt.hashSync(user.password, 10)
  //     console.log(decrypt.hashSync(user.password, 10))*/
  //     //res.json(user)  
  //     res.render('./auth/modify-user', { user }) 
  //   })
  // },  
} 

module.exports = controlUser;
