import graph from 'fbgraph'
import { Facebook } from '../model/Facebook'


var access_token = "139610759813141|f928e2e59299981a997116c967a20b1d"
graph.setAccessToken(access_token);

var userIDs = ["CIEatKMITL","kmitl001","sorkmitl","1749829098634111","kmitl.engineer.inter","CE.KMITL"];
var limit="";
var since="2016-08-01";
var until="";

export function getDetail(userID) {

    return new Promise((resolve) =>{
        graph.get(userID, (err, res) => {
            resolve(res);
        })
    })

     
}

export function getFeed(userID,since,until) {

    var params = {fields: "",since: since,until: until}
    
    return new Promise((resolve,reject) => {

        graph.get(userID+"/feed",params,(err ,res) =>{
                resolve(res)
        })
       
    })
     
}

export function updateDB(){
    
    for(var userID of userIDs){
        getFeed(userID,since,until)
        .then( result => {

            for(var data of result.data){
                if(data.message){
                    Facebook.findOrCreate({
                        where:{
                            postID: data.id
                        },
                        defaults:{
                            userID: data.id.substring(0,data.id.indexOf("_")),
                            postID: data.id,
                            message: data.message,
                            postCreatedTime: data.created_time
                        }
                    })
                    .then(() => {
                        console.log('save complete');
                    })
                    .catch((err) => {
                        console.log(err.stack);
                    })
                }
            }
        })
    }
    
}
