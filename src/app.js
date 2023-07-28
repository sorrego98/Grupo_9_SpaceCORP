const express = require('express');
const path = require('path');
const app = express();
const routeMain = require("../routers/routesMain");
const routeProducts = require("../routers/routesProducts");
const routeUser = require("../routers/routesUser");
const routeCart = require("../routers/routesCart");
const routeAdmin = require("../routers/routesAdmin");
const methodOverride = require('method-override');
require('dotenv').config();

const PORT = parseInt(process.env.PORT);

app.use(express.static(path.resolve(__dirname, '../public')));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());

app.use('/',routeMain);

app.use('/products',routeProducts);

app.use('/auth',routeUser);

app.use('/cart',routeCart);

app.use('/admin',routeAdmin);

app.listen(PORT, () => console.log("Server Running on " + PORT));