"use strict";
import express from 'express'
import * as TwitterService from '../service/TwitterService'

let twitterRouter = express.Router()

twitterRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Twitter</h1>')
})

twitterRouter.route('/index').get((req, res) => {
  res.send('<h1>This is index page</h1>')
})

twitterRouter.route('/tweet').post((req, res) => {
  res.send(TwitterService.tweet(req.body.status))
})

twitterRouter.route('/search').post((req, res) => {
  TwitterService.search(req.body.q, req.body.count)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err.stack);
    })

})

export default twitterRouter
