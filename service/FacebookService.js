import graph from 'fbgraph'
import promise from 'bluebird'

promise.promisifyAll(graph)

var access_token = "139610759813141|f928e2e59299981a997116c967a20b1d"
graph.setAccessToken(access_token);

var userIDs = ["CIEatKMITL","kmitl001","sorkmitl","1749829098634111","kmitl.engineer.inter","CE.KMITL"];
var limit="";
var since="2016-08-01";
var until="";

export function getDetail() {
    for(var userID of userIDs){
        graph.get(userID, function(err, res) {
            console.log("detail >> "); 
            console.log(res);
        });
    }
     
}

export function getFeed() {

    var params = {fields: "message",since: since}
   //for(var userID of userIDs){
    return graph.getAsync("CIEatKMITL"+"/feed",params)
    .then(result => {
        //console.log(result)
        return result
    })
    .catch(err => {
        console.log('getFeed error :',err.stack)
    })
       // console.log(fn);
   //}
     
}

