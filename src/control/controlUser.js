const path = require("path");
const { unlink } = require('fs-extra');
const bcrypt = require('bcryptjs');
const dbUser = require('../database/scripts/user');
const db = require('../database/models');
const { validationResult } = require('express-validator');
const { where } = require("sequelize");

module.exports = controlUser = {

  register: {
    show: (req, res) => res.render('../views/auth/guest/register')

  },
  
  auth: {
    show: (req, res) => res.render('../views/auth/guest/login'),
    
    enterSession: (req, res) => {
      let data = req.body.userMailUserName;
      let password = req.body.userPass;
      let remindMe = req.body.remindMe;
      let errors = validationResult(req);
      
      
      if (errors.isEmpty()) {
        dbUser.findUser.toLogin(data)
        .then(results => {
          const user = results.user
          
          if (bcrypt.compareSync(password, user.password) === true) {
            req.session.usuario = user;
            if (remindMe) { res.cookie('data', data, { maxAge: 1000 * 60 * 60 * 24 }) }
            if (user.roles.roleName == "ADMINISTRADOR") {
              return res.status(200).redirect('/admin'
                , { message: [{ type: "success", msg: "Ingreso Satisfactorio; Bienvenido" + user.firstName + " " + user.lastName}] }
                );
            } else {
              return res.status(200).redirect('/auth/profile'
              ,{ message: [{ type: "success", msg: "Ingreso Satisfactorio; Bienvenido" + user.firstName + " " + user.lastName}] }
              );
              }
            } else {
              /*defino mi propio tipo de error, en caso de que  en la bdd no se consigan datos*/
              res.clearCookie('email');
              return res.render(path.resolve(__dirname, '../views/auth/guest/login'),
                { message: [{type: "error", msg: "usuario y/o contraseña inválidos." }] })
              
            }
          })
          .catch((errors) => {
            console.log(errors)
            return res.status(400).render(path.resolve(__dirname, '../views/auth/guest/login'), { message: errors })
          })
          
        }
        else {
          return res.render(path.resolve(__dirname, '../views/auth/guest/login'), { message: errors.errors });
          
        }
        
    },

    createUser: (req, res) => {
      let errors = validationResult(req);
      console.log(errors)
      if (errors.isEmpty()) {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const userName = req.body.user_name;
        const password = bcrypt.hashSync(req.body.password, 10);
        const email = req.body.email;
        const imageProfile = req.file ? req.file.filename : ""
  
        /* valido si el mail está registrado */
        dbUser.findUser.ifEmailRegistered(email)
          .then( () => {            
            /* valido si el userName está registrado */
            return dbUser.findUser.ifUserNameRegistered(userName)
          })
          .then( () => {
            let newUser = {
              firstName,
              lastName,
              userName,
              password,
              email
            }

            if (imageProfile){
              newUser = newUser.map( key => {return {...key, imageProfile}})
            }

            return  dbUser.CreateUser(newUser)
              
          })
          .then((message) => {
            return  res.redirect('/auth',{message});
          })
          .catch((message) => {
            return  res.redirect('/auth',{message});
          })
        
      }else{        
        res.render(path.resolve(__dirname, '../views/auth/guest/login'),  {message: errors.errors})
  
      }
    },
      
    endSession: (req, res) => {
      req.session.destroy();
      res.clearCookie('email');
      res.redirect('/auth')
    }
  },

  profile: {
    show: (req, res) => res.render('./auth/profile', { user: req.session.usuario }),

    edit: function (req, res) {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        const id = parseInt(req.session.usuario.id);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const oldImage = req.body.oldImage;
        let lastImage = req.file ? req.file.filename : oldImage;
        const usuario = {
          firstName: firstName,
          lastName: lastName,
          imageProfile: lastImage
        }

        /* PROMESA: Encontrar el usuario*/
        dbUser.findUser.byPk(id)
          .then(findedUser => {
            /* PROMESA: Actualizar el usuario*/
            return dbUser.updateUserData(id, usuario, findedUser.user)
          })
          .then(updatingUser => {
            /* PROMESA: Obtener datos actualizados DB*/
            return dbUser.findUser.byPk(id);
          })
          .then(returnedUser => {
            /* PROMESA: última respuesta para renderizar resultados */
            req.session.usuario = returnedUser.user;
            return res.redirect("/auth/profile");
          })
          .catch(error => res.send(error))
      } else {

      }
    }
  },

  roleAdmin: {
    usersList: (req, res) => {
      const users = db.Users.findAll({ include: [{ association: 'roles' }] });
      const roles = db.Roles.findAll();
      Promise.all([users, roles])
        .then(([allUsers, allRoles]) => {
          res.render('./admin/users/list-users', { allUsers, allRoles })
        })
        .catch(error => res.send(error))
    },
    changeRole: (req, res) => {
      const id = req.body.idUser;
      console.log(id)
      const roleId = req.body.userRole;
      db.Users.update(
        {
          roleId: roleId
        },
        { where: { id } }
      )
        .then(() => {
          res.redirect('/admin/')
        })
        .catch(error => res.send("Error presente: " + error));
    }
  }
}
