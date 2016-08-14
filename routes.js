1
"use strict";
import express from 'express'
import bodyParser from 'body-parser'
import twitterRouter from './controller/TwitterController'
import facebookRouter from './controller/FacebookController'
import { Twitter } from './model/Twitter'


const port = process.env.port || 7777
let app = express()


// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//parent url
app.route('/').get((req, res) => {
  res.send('<h1>Social REST Api</h1><ul><li>/twitter</li><li>/facebook</li></ul>')
})

app.use('/twitter', twitterRouter)
app.use('/facebook', facebookRouter)

app.route('/save').get((req, res) => {
  let twitter = Twitter.build({
    text: 'test'
  })
  twitter.save()
    .then(() => {
      console.log('save complete');
    })
    .catch((err) => {
      console.log(err.stack);
    })
})



//service start
app.listen(port, () => {
  console.log('Starting node.js on port ' + port)
});
