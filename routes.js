1
"use strict";
import express from 'express'
import bodyParser from 'body-parser'
import twitterRouter from './controller/TwitterController'

const port = process.env.port || 7777
let app = express()

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//parent url
app.use('/twitter', twitterRouter)

//service start
app.listen(port, () => {
  console.log('Starting node.js on port ' + port)
});
