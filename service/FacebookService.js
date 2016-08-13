import graph from 'fbgraph';

var access_token = "139610759813141|f928e2e59299981a997116c967a20b1d";
graph.setAccessToken(access_token);

export function getDetail() {
     graph.get("501403786556532", function(err, res) {
        console.log("detail >> "); 
        console.log(res);
    });
}

export function getFeed() {
     graph.get("501403786556532/feed", function(err, res) {
        console.log("feed >> "); 
        for(var feed of res.data){
            console.log(feed.id+" - "+feed.message);
        }
        
    });
}