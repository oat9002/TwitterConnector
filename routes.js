1
"use strict";
import express from 'express'
import * as FacebookController from './controller/FacebookController'
import bodyParser from 'body-parser'
import twitterRouter from './controller/TwitterController'

const port = process.env.port || 7777
let app = express()

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


app.use('/facebook', facebookRouter)

facebookRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Facebook</h1>')
})

facebookRouter.route('/getDetail').get((req, res) => {
   FacebookController.getDetail(function(message){
      res.send(message);
   });
})

facebookRouter.route('/getFeed').get((req, res) => {
  
   FacebookController.getFeed(function(message){
      var body=""
      for(var data of message.data){
        if(data.message)
          body = body+"<br> -"+data.message
      }
        res.send(body);
   });
})
//service start
app.listen(port, () => {
  console.log('Starting node.js on port ' + port)
});
