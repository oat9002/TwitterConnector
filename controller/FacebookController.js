"use strict";
import express from 'express'
import promise from 'bluebird'
import * as FacebookService from '../service/FacebookService'

let facebookRouter = express.Router()

facebookRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Facebook</h1>')
})

facebookRouter.route('/getDetail').get((req, res) => {
   FacebookService.getDetail()
   .then(result =>{
      res.send(result);
   })
})

facebookRouter.route('/getFeed').get((req, res) => {
  
  FacebookService.getFeed()
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