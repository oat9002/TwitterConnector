"use strict";
import express from 'express'
import promise from 'bluebird'
import * as FacebookService from '../service/FacebookService'

let facebookRouter = express.Router()

var userIDs = ["CIEatKMITL","kmitl001","sorkmitl","1749829098634111","kmitl.engineer.inter","CE.KMITL"];
var limit="";
var since="2016-08-01";
var until="";


facebookRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Facebook</h1>')
})

facebookRouter.route('/getDetail').get((req, res) => {

   var detail = []
   for(var user of userIDs){
      FacebookService.getDetail(user)
      .then(result =>{
          detail.push(result)

          if(detail.length == userIDs.length){
              res.send(detail)
          }
      })
   }
   
})

facebookRouter.route('/getFeed').get((req, res) => {
  
  var feed = []
  for(var user of userIDs){
      FacebookService.getFeed(user,since,until)
      .then(result =>{
          feed.push(result)
          if(feed.length == userIDs.length){          
             res.send(feed)
          }
      })
      
  }

   
})

export default facebookRouter