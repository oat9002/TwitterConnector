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

   var detail
   //for(var user of userIDs){
      FacebookService.getDetail(user)
      .then(result =>{
          detail.push(result)
      })
   //}
   
})

facebookRouter.route('/getFeed').get((req, res) => {
  
  FacebookService.getFeed("CIEatKMITL",since,until)
   .then(result =>{
      var body=""
      for(var data of result.data){
        if(data.message)
          body = body+"<br> -"+data.message
      }
        res.send(body)
   })
      
   
})

export default facebookRouter