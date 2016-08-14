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

facebookRouter.route('/addPage').get((req, res) => {

    FacebookService.addPage(req.query.pageID)
    res.send("done")
   
})

facebookRouter.route('/getUserID').get((req, res) => {

   var detail = []
   var detailstr = ""
   Facebook.findAll({
        attributes: ['userID'],
        group: ['userID']
        
    }).then( (feeds) =>{
        for(var feed of feeds){
            detail.push(feed.dataValues.userID)
            detailstr += "<br>-"+feed.dataValues.userID
        }
    }).then(() => {
        res.send(detailstr)
    })
   
})

facebookRouter.route('/getMessage').get((req, res) => {
  
  var messages = []
  var messagestr = ""
    Facebook.findAll({
        attributes: ['message'],
        where: {
        userID: req.query.userID
        }
    }).then( (feeds) =>{
        for(var feed of feeds){
            messages.push(feed.dataValues.message)
            messagestr += "<br>-"+feed.dataValues.message
        }
    }).then(() => {
        res.send(messagestr)
    })

   
})

facebookRouter.route('/updateDB').get((req, res) => {
    FacebookService.updateDB()
    res.send("done")
    
})

facebookRouter.route('/getPageID').get((req, res) => {
    FacebookService.getPageID().then((pageID) =>{
        res.send(pageID)
    })
    
    
})

export default facebookRouter