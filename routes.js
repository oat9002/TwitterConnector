"use strict";
import express from 'express'
import TwitterController from '../TwitterController'
import bodyParser from 'body-parser'

const port = process.env.port || 7777
let app = express()
let router = express().Router()

app.get('/', (req, res) => {
    res.send('<h1>Hello Node.js</h1>')
});

app.get('/index', (req, res) => {
    res.send('<h1>This is index page</h1>')
});

app.get('/tw', (req, res) => {
    res.json(user);
});

//service start
app.listen(port, () => {
    console.log('Starting node.js on port ' + port)
});

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
