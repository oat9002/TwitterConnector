import Twit from 'twit'

let T = new Twit({
  consumer_key: 'eFroY0pfuCmbSf4OrwFckHDUY',
  consumer_secret: 'xCJRkrUHuPGAGs7ZCAdKOjqDfIcghzMGjfrS6xLXHZUKwJ430x',
  access_token: '	3854752459-6KWXoTPeBbxUdydKsAUNohUru2DBioZ9jmeaIFn',
  timeout_ms: 60 * 1000
})

export function tweet(status) {
  T.post('statuses/update', { status: status }, (err, data, response) => {
    console.log(data)
  })
}
