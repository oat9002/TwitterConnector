import graph from 'fbgraph'

var access_token = "139610759813141|f928e2e59299981a997116c967a20b1d"
graph.setAccessToken(access_token);

var userIDs = ["CIEatKMITL","kmitl001","sorkmitl","1749829098634111","kmitl.engineer.inter","CE.KMITL"];
var limit="";
var since="2016-08-01";
var until="";

export function getDetail() {

    return new Promise((resolve) =>{
        graph.get("CIEatKMITL", (err, res) => {
            resolve(res);
        })
    })

     
}

export function getFeed() {

    var params = {fields: "message",since: since}
    
    return new Promise((resolve,reject) => {

        graph.get("CIEatKMITL"+"/feed",params,(err ,res) =>{
                resolve(res)
        })
       
    })
     
}

