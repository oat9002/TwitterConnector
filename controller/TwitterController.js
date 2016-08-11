"use strict";
import express from 'express'

const port = process.env.port || 7777
let app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello Node.js</h1>');
});

app.get('/index', (req, res) => {
    res.send('<h1>This is index page</h1>');
});

app.get('/user', (req, res) => {
    res.json(user);
});

app.listen(port, () => {
    console.log('Starting node.js on port ' + port);
});
