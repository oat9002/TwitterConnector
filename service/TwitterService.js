import Twit from 'twit'
import { db } from '../db'
import cron from 'cron'
import axios from 'axios'

let cronJob = cron.CronJob

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

export function searchAndSaveTweet(q) {
  return new Promise((resolve, reject) => {
    searchTweet(q).then(data => {
      saveTweet(data)
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function searchTweet(q) {
  return new Promise((resolve, reject) => {
    T.get('search/tweets', { q: q, count: 10}, (err, data, response) => {
      if(err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

export function searchTweetNearby(lat, lng, since) {
  return new Promise((resolve, reject) => {
    T.get('search/tweets', { q: "since:" + since, geocode: "\"" + lat + "," + lng + "," + "0.2km\"", result_type: 'mixed' }, (err, data, response) => {
      if(err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

function sendToHadoop() {
  axios.post('http://203.151.85.73:5000/twitter/saveTweet', {
    tweets: data.statuses
  }).catch(err => {
    console.log(err)
  })
}

function saveTweet(data) {
  data.statuses.forEach(item => {
   db.tweet.findOne({id: item.id}, (err, document) => {
     if(!document) {
       let tweet = item
       tweet.created_at = new Date(item.created_at)
       tweet.user.created_at = new Date(item.user.created_at)
       if(typeof tweet.retweeted_status != 'undefined') {
         tweet.retweeted_status.created_at = new Date(item.retweeted_status.created_at)
         tweet.retweeted_status.user.created_at = new Date(item.retweeted_status.user.created_at)
       }
       db.tweet.insert(tweet, err => {
         if(err) {
           console.log(err)
         }
       })
     }
   })
 })
}

// save tweets every 30 second
let saveTweetJob = new cronJob('*/30 * * * * *', () => {
  // getAllQuery().then(docs => {
    // docs.forEach(item => {
      let item = {}
      item.query = "สยามพารากอน"
      T.get('search/tweets', { q: item.query, count: 100}, (err, data) => {
        if(err) {
          console.log(err.stack)
        }
        else {
          saveTweet(data)
        }
      })
    // })
  // })
  .catch((err) => {
    console.log(err)
  })
},
() => {
  console.log('saveTweetJob has stopped')
},
true
)

export function addQuery(query) {
  db.tweetQuery.insert({ query: query }, err => {
    if(err) {
      console.log(err)
    }
  })
  testTweetQuery()
}

function getAllQuery() {
  return new Promise((resolve, reject) => {
    db.tweetQuery.find((err, docs) => {
      if(err) {
        reject(reject)
      }
      else {
        resolve(docs)
      }
    })
  })
}

function testTwitterQuery() {
  db.tweet.find((err, docs) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log(docs)
    }
  })
}

function testTweetQuery() {
  db.tweetQuery.find((err, docs) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log(docs)
    }
  })
}

export function getAllTweet() {
  return new Promise((resolve, reject) => {
    db.tweet.find((err, docs) => {
      if(err) {
        reject(err)
      }
      else {
        resolve(docs)
      }
    })
  })
}
