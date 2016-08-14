import Twit from 'twit'

let T = new Twit({
  consumer_key: 'eFroY0pfuCmbSf4OrwFckHDUY',
  consumer_secret: 'xCJRkrUHuPGAGs7ZCAdKOjqDfIcghzMGjfrS6xLXHZUKwJ430x',
  access_token: '3854752459-6KWXoTPeBbxUdydKsAUNohUru2DBioZ9jmeaIFn',
  access_token_secret: '9qow1TnZqKaWVgZ6V22qcNeqEz5IoFroVOTGs846H6yfQ',
  timeout_ms: 60 * 1000
})

export function tweet(status) {
  T.post('statuses/update', { status: status })
    .then(result => {
      return result.response
    })
    .catch(err => {
      console.log('tweet error', err.stack);
    })
}

export function search(q, count) {
  T.get('search/tweets', { q: q, count: count})
    .then(result => {
      return result.data
    })
    .catch(err => {
      console.log('search error', err.stack);
    })
}
