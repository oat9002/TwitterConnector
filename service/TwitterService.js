import Twit from 'twit'
import { db } from '../db'

let T = new Twit({
  consumer_key: 'eFroY0pfuCmbSf4OrwFckHDUY',
  consumer_secret: 'xCJRkrUHuPGAGs7ZCAdKOjqDfIcghzMGjfrS6xLXHZUKwJ430x',
  access_token: '3854752459-6KWXoTPeBbxUdydKsAUNohUru2DBioZ9jmeaIFn',
  access_token_secret: '9qow1TnZqKaWVgZ6V22qcNeqEz5IoFroVOTGs846H6yfQ',
  timeout_ms: 60 * 1000
})

export function tweet(status) {
  return new Promise((resolve, reject) => {
    T.post('statuses/update', { status: status }, (err, data, response) => {
      if(err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}


export function searchTweet(q) {
  return new Promise((resolve, reject) => {
    T.get('search/tweets', { q: q}, (err, data, response) => {
      if(err) {
        reject(err)
      }
      else {
        saveTweet(data)
        testQuery()
        resolve(data)
      }
    })
  })
}

function addCoordinate(lat, lng) {

}

export function searchTweetNearby(lat, lng, since) {
  return new Promise((resolve, reject) => {
    T.get('search/tweets', { q: "since:" + since, geocode: "\"" + lat + "," + lng + "," + "1km\"", result_type: 'mixed' }, (err, data, response) => {
      if(err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

function saveTweet(data) {
   for(let item of data.statuses) {
     let tweet = {}
     tweet.tweetID = item.id
     tweet.text = item.text
     tweet.textCreatedDate = item.created_at
     console.log(tweet)
     db.twitter.save(tweet, (err) => {
       console.log(err)
     })
    // Twitter.create({
    //   tweetID: item.id,
    //   text: item.text,
    //   textCreatedDate: item.created_at,
    //   latitude: data.latitude,
    //   longitude: data.longitude
    // })
    //   .then(() => {
    //     console.log('Save complete.');
    //   })
    //   .catch((err) => {
    //     console.log(err.stack);
    //   })
   }
}

function testQuery() {
  db.twitter.find((err, docs) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log(docs)
    }
  })
}
