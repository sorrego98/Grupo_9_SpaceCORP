const path = require("path");
const { unlink } = require('fs-extra');
const bcrypt = require('bcryptjs');
const dbUser = require('../database/scripts/user');
const db = require('../database/models');
const { validationResult } = require('express-validator');
const { where } = require("sequelize");

module.exports = controlUser = {

  register: {
    show: (req, res) => res.render('../views/auth/register'),

    create: (req, res) => {
      let errors = validationResult(req);
      console.log(errors)
      if (errors.isEmpty()) {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const userName = req.body.user_name;
        const password = bcrypt.hashSync(req.body.password, 10);
        const email = req.body.email;
        const imageProfile = req.file ? req.file.filename : ""

        dbUser.findUser.existEmail(email)
        
      }else{        
        res.render(path.resolve(__dirname, '../views/auth/register'),  {errors: errors.errors, old: req.body})

      }
    }
  },

  login: {
    show: (req, res) => { res.render('../views/auth/login') },

    enterSession: (req, res) => {
      let data = req.body.data;
      let password = req.body.password;
      let remindMe = req.body.recordarme;
      let errors = validationResult(req);

      if (remindMe) { res.cookie('data', data, { maxAge: 1000 * 60 * 60 * 24 }) }

      if (errors.isEmpty()) {
        dbUser.findUser.toLogin(data)
          .then(results => {
            const user = results.user

            if (bcrypt.compareSync(password, user.password) === true) {
              req.session.usuario = user;
              if (user.roles.roleName == "ADMINISTRADOR") {
                return res.status(200).redirect('/admin');
              } else {
                return res.status(200).redirect('/auth/profile');
              }
            } else {
              /*defino mi propio tipo de error, en caso de que  en la bdd no se consigan datos*/
              res.clearCookie('email');
              return res.render(path.resolve(__dirname, '../views/auth/login'),
                { errors: [{ msg: "usuario y/o contraseña inválidos." }] })

            }
          })
          .catch((errors) => {
            return res.render(path.resolve(__dirname, '../views/auth/login'), { errors })
          })

      }
      else {
        res.clearCookie('email');
        return res.render(path.resolve(__dirname, '../views/auth/login'), { errors: errors.errors });

      }

    },

    endSession: (req, res) => {
      req.session.destroy();
      res.clearCookie('email');
      res.redirect('/auth/login')
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
