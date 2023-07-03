const express = require('express');
const path = require('path');
const app = express();
const port = 5050;

app.use(express.static(path.resolve(__dirname, '../public')));
app.get('/', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/home.html');
    res.sendFile(htmlPath);
});

app.get('/products', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/products.html');
    res.sendFile(htmlPath);
});

app.get('/login', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/login.html');
    res.sendFile(htmlPath);
});

app.get('/register', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/register.html');
    res.sendFile(htmlPath);
});

app.get('/productCart', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/productCart.html');
    res.sendFile(htmlPath);
});

app.get('/contacts', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/contacts.html');
    res.sendFile(htmlPath);
});

app.listen(port, () => console.log('Server Running'));