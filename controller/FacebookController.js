"use strict";
import * as FacebookService from '../service/FacebookService'

export function getDetail(fn) {
    
   FacebookService.getDetail();
   FacebookService.getFeed("",function(feed){
      fn(feed)
   });
 
//    foo("address", function(location){
//   alert(location); // this is where you get the return value
// });
}
