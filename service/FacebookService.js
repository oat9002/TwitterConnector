import graph from 'fbgraph'

var access_token = "139610759813141|f928e2e59299981a997116c967a20b1d"
graph.setAccessToken(access_token);


export function getDetail(userID) {

    return new Promise((resolve) =>{
        graph.get(userID, (err, res) => {
            resolve(res);
        })
    })

     
}

export function getFeed(userID,since,until) {

    var params = {fields: "message",since: since,until: until}
    
    return new Promise((resolve,reject) => {

        graph.get(userID+"/feed",params,(err ,res) =>{
                resolve(res)
        })
       
    })
     
}

