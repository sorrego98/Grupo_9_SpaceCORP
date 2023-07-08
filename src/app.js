const express = require('express');
const path = require('path');
const app = express();
const routeProducts = require("../routers/routesProducts");
const routeUser = require("../routers/routesUser");
require('dotenv').config();
const PORT = parseInt(process.env.PORT);

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/home.html');
    res.sendFile(htmlPath);
});

app.use('/',routeProducts)

app.use('/',routeUser)

app.get('/contacts', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/contacts.html');
    res.sendFile(htmlPath);
});

app.listen(PORT, () => console.log("Server Running on " + PORT));