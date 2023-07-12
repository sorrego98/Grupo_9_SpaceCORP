const express = require('express');
const path = require('path');
const app = express();
const routeProducts = require("../routers/routesProducts");
const routeUser = require("../routers/routesUser");
const routeCart = require("../routers/routesCart");
require('dotenv').config();
const PORT = parseInt(process.env.PORT);

app.use(express.static(path.resolve(__dirname, '../public')));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/products',routeProducts)

app.use('/profile',routeUser)

app.use('/cart',routeCart)

app.get('/contacts', (req, res) => {
    res.render('./misc/contacts');
});

app.listen(PORT, () => console.log("Server Running on " + PORT));