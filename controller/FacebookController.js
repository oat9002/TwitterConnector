"use strict";
import express from 'express'
import promise from 'bluebird'
import * as FacebookService from '../service/FacebookService'

let facebookRouter = express.Router()

facebookRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Facebook</h1>')
})

facebookRouter.route('/getDetail').get((req, res) => {
   FacebookService.getDetail(function(message){
      res.send(message);
   });
})

facebookRouter.route('/getFeed').get((req, res) => {
  
   
   console.log(FacebookService.getFeed())
  //  .then(result =>{
  //     var body=""
  //     // for(var data of message.data){
  //     //   if(data.message)
  //     //     body = body+"<br> -"+data.message
  //     // }
  //       res.send(result)
  //  })
      
   
})

export default facebookRouter