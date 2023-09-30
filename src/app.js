const express = require('express');
const app = express();
const path = require('path');


//Requerir las rutas
const routeMain = require("./routers/routesMain");
const routeProducts = require("./routers/routesProducts");
const routeUser = require("./routers/routesUser");
const routeCart = require("./routers/routesCart");
const routeAdmin = require("./routers/routesAdmin");
const routeAPI = require("./routers/api/routesAPI");

const methodOverride = require('method-override');
require('dotenv').config();

const PORT = parseInt(process.env.PORT);

//Aqui requiero los paquetes para trabajar lo referido a session y cookies
const session = require ('express-session');
const cookieParser = require('cookie-parser');
//Requerir el middleware que controla si el usuario está o no Logueado
const acceso = require('./middlewares/acceso');
const loggedMiddleware = require('./middlewares/loggedMiddleware');

//Para validar si están funcionando las relaciones
const db = require('./database/models');
//db.Category.findByPk(2, {include: [{association: "subcategories"}]})
//.then((categoria)=>console.log(JSON.stringify(categoria,null,2)))
//.catch((error) => console.log(`Error tirado : ${error}`));

// db.Users.findAll({include: [{association: 'roles'}]})
// .then((usuarios)=>console.log(JSON.stringify(usuarios,null,2)))
// .catch((error) => console.log(`Error tirado : ${error}`));


app.use(express.static(path.resolve(__dirname, '../public')));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname, 'views'));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));
app.use(express.json());

// Aquí requerimos nuestros middlewares de session y cookies
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true
}));

//Aqui coloco el Middleware para activar lo referido a las cookies
app.use(cookieParser());

//Middleware de aplicación que se encarga de controlar si el usuario está logueado o no.
app.use(acceso);
app.use(loggedMiddleware);

//Para usar las rutas
app.use('/',routeMain);
app.use('/products',routeProducts);
app.use('/auth',routeUser);
app.use('/cart',routeCart);
app.use('/admin',routeAdmin);
app.use('/api',routeAPI);

//Levantar servidor
app.listen(PORT, () => console.log("Server Running on " + PORT));