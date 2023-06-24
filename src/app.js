const express = require('express');
const path = require('path');
const app = express();
const port = 5050;

app.get('/', (req, res) => res.send('Prueba'));


app.get('/registration', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/registration.html');
    res.sendFile(htmlPath);
});

app.get('/productCart', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/productCart.html');
    res.sendFile(htmlPath);
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(port, () => console.log('Server Running'));