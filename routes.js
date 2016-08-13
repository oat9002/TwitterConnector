"use strict";
import express from 'express'
import * as TwitterController from './controller/TwitterController'
import * as FacebookController from './controller/FacebookController'

import bodyParser from 'body-parser'

const port = process.env.port || 7777
let app = express()
let twitterRouter = express.Router()
let facebookRouter = express.Router()

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//parent url
app.route('/').get((req, res) => {
  res.send('<h1>Social REST Api</h1><br>/twitter<br>/facebook')
})

app.use('/twitter', twitterRouter)

twitterRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Twitter</h1>')
})

twitterRouter.route('/index').get((req, res) => {
  res.send('<h1>This is index page</h1>')
})

twitterRouter.route('/tweet').post((req, res) => {
  TwitterController.tweet(req.body)
})

app.use('/facebook', facebookRouter)

facebookRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Facebook</h1>')
})

facebookRouter.route('/getDetail').get((req, res) => {
   FacebookController.getDetail(function(message){
      res.send(message);
   });
   //console.log("routes >> "+ text);
   //(text)
})


//service start
app.listen(port, () => {
  console.log('Starting node.js on port ' + port)
});
