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

twitterRouter.route('/searchTweet').post((req, res) => {
  TwitterService.searchTweet(req.body.q)
    .then(result => {
      let data = {}
      let arrData = []
      result.statuses.forEach(item => {
        data.text = item.text
        data.textCreatedDate = item.created_at
        arrData.push(data)
      })
      let jsonReturn = {}
      jsonReturn.statuses = arrData
      res.send(jsonReturn)
    })
    .catch(err => {
      console.log(err.stack);
    })
})

twitterRouter.route('/searchTweetNearby').post((req, res) => {
  TwitterService.searchTweetNearby(req.body.lat, req.body.lng, req.body.since)
    .then(result => {
      let data = {}
      let arrData = []
      result.statuses.forEach(item => {
        data.text = item.text
        data.textCreatedDate = item.created_at
        data.latitude = req.body.lat
        data.longitude = req.body.lng
        arrData.push(data)
      })
      let jsonReturn = {}
      jsonReturn.statuses = arrData
      if(jsonReturn.statuses.length != 0) {
        TwitterService.saveTweet(jsonReturn.statuses)
      }
      res.send(jsonReturn)
    })
})

export default twitterRouter
