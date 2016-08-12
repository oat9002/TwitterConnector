"use strict";
import * as TwitterService from '../service/TwitterService'

export function tweet(data) {
  TwitterService.tweet(data.status)
}
