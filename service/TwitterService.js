import Twit from 'twit'

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

export function saveTweet(statuses) {
  for(let item of statuses){
    console.log(item);
    Twitter.build({
      text: item.text,
      textCreatedDate: item.textCreatedDate,
      latitude: item.latitude,
      longitude: item.longitude
    })
      .save()
      .then(() => {
        console.log('Save complete.');
      })
      .catch((err) => {
        console.log(err.stack);
      })
  }
}
