"use strict";
import * as FacebookService from '../service/FacebookService'


export function getDetail(fn) {
    
   FacebookService.getDetail();
   

}
export function getFeed(fn){
    FacebookService.getFeed(function(feed){
      fn(feed)
   });
}
