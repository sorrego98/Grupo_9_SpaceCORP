const path = require("path");
const fs = require('fs');
const controlMain = require('./controlMain');
const bcrypt = require('bcryptjs');


//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult } = require('express-validator');

const controlUser = {
  register: (req, res) => {
    res.render('../views/auth/register');
  },

  create: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const usersId = controlMain.controlMethods.leerJSON("users.json");
      const lastUser = usersId.pop();
      usersId.push(lastUser);

      let user = {
        //id: (parseInt(lastUser.id) +1).toString(),
        id: parseInt(lastUser.id) + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        image_profile: req.file ? req.file.filename : "",
        role: 2,
      };
      let archivoUsers = fs.readFileSync(
        path.resolve(__dirname, "../data/users.json"),
        {
          encoding: "utf-8",
        }
      );
      let users;
      if (archivoUsers == "") {
        users = [];
      } else {
        users = JSON.parse(archivoUsers);
      }

      users.push(user);
      usersJSON = JSON.stringify(users, null, 2);
      fs.writeFileSync(
        path.resolve(__dirname, "../data/users.json"),
        usersJSON
      );
      res.redirect("/auth/login");
    } else {
      return res.render(path.resolve(__dirname, "../views/auth/register"), {
        errors: errors.errors,
        old: req.body,
      });
    }
  },

  login: (req, res) => {
    res.render('../views/auth/login')
  },
  loginProcess: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let archivoUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
      let usuarioLogueado = archivoUsers.find(usuario => usuario.email == req.body.email)
      //console.log(usuarioLogueado);
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
    }
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
  }
};

module.exports = controlUser;
