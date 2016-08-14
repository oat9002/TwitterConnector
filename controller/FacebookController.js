"use strict";
import express from 'express'
import promise from 'bluebird'
import * as FacebookService from '../service/FacebookService'
import { Facebook } from '../model/Facebook'


let facebookRouter = express.Router()

var userIDs = ["CIEatKMITL","kmitl001","sorkmitl","1749829098634111","kmitl.engineer.inter","CE.KMITL"];
var limit="";
var since="2016-08-01";
var until="";


facebookRouter.route('/').get((req, res) => {
  res.send('<h1>Facebook Api</h1><ul><li>/getDetail</li><li>/getFeed</li></ul>')
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

facebookRouter.route('/getMessage').get((req, res) => {
  
  var messages = []
  var messagestr = ""
 // for(var user of userIDs){
      Facebook.findAll({
          attributes: ['message'],
          where: {
            userID: "1749829098634111"
          }
      }).then( (feeds) =>{
          for(var feed of feeds){
                messages.push(feed.dataValues.message)
                messagestr += "<br>-"+feed.dataValues.message
          }
      }).then(() => {
          res.send(messagestr)
      })
  //}

   
})

facebookRouter.route('/updateDB').get((req, res) => {
    FacebookService.updateDB()
    res.send("done")
    
})

export default facebookRouter