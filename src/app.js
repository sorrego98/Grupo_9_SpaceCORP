const express = require(`express`);
const patch = require(`path`);
const app = express();
const port = 5050;

app.get(`/`, (req, res) => res.send(`Prueba`));
app.listen(port, () => console.log(`Server Running`));