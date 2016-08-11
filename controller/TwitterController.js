"use strict";
import * as TwitterService from '../service/TwitterService'

export function tweet(req, res) {
  let json = req.body
  TwitterService.tweet(json.status)
}
