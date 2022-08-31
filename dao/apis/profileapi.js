import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';



export async function GetProfile(userName, headers) {
  try {

    if (headers.cookie === undefined || headers.appid === undefined) {
      throw new ErrorModel(440, "Cookie or appid not present in the header request")
    }

    // let result = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`, {
    //   "headers": {
    //     "accept": "*/*",
    //     "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
    //     "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"104\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"macOS\"",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-site",
    //     "x-asbd-id": "198387",
    //     "x-ig-app-id": headers.appid,
    //     "cookie": headers.cookie,
    //     "Referer": "https://www.instagram.com/",
    //     "Referrer-Policy": "strict-origin-when-cross-origin"
    //   },
    //   "body": null,
    //   "method": "GET"
    // });



    let result = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-asbd-id": "198387",
    "x-csrftoken": "PmJDA6glsO7LCBjoz5rkGZ4RkkXpiDKF",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR3DpFguNkFuJaIoi4y5Wc6O5vrROTJvD6URl60moWtZeSyM",
    "x-instagram-ajax": "1006126182",
    "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; dpr=2.5; ds_user_id=8542681467; sessionid=8542681467%3A7nRgDkBtkBQLR5%3A9%3AAYe9Nk0Wh6eNqMbbelD-I3Gtpq3xDMBQYO5Cu1tQYw; csrftoken=PmJDA6glsO7LCBjoz5rkGZ4RkkXpiDKF; shbid=\"6002\\0548542681467\\0541693516248:01f7740548ff9740d79c6e9b7b6c31cd758294219250a70d540c27af1dcd6a8a5cf1a8bd\"; shbts=\"1661980248\\0548542681467\\0541693516248:01f71aa5539504576f788d04d03798f3ebfa8798b6dda3b63b3a09e6403b0725a78c0dd5\"; fbsr_124024574287414=AC5hXHcfYW86slqB9fsi_Y_4aupqNy6Xv8Rr_s4Xc3Y.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRQlBKazJxQUpJTTFSYVpCZEg2eUc5NldxS0FaVWFjOUhWbUtaY2FyOGo1YWtmRTVMeUxtODRRbWRlV2JoWlpoOTVuMTAtQjg5eVJlMTZ6dTRrRFkzMy1HVjhmX0g1bHFPV1lZeHVEOGNqRWhCQ2Z4NVlxdDQtWVhvYWRSMlVIazQ1YUc1OENEcU5WTTVXWG9PTzVnR0JMSjVoQVRQeDZiT0RoUDZVVWRxRWR6UjQyZzdKOVhFQTFzRU1KY0pIZzVDQjY5M2ZmR3h5YndadkZObnZxdFg1TnFFVzhkZmNyaDJodmxVaHg5OU4wLVp5VkRpd1dHdnluSFVFTWFQbGlwdUdzRGQtbUhOYWV6ZUg3OEdXQzVPcnE1X2RwaE05WmpJeVhUMEtaMFBhNUNRVUZfbGFMZFJYX2ZaMy1LLVNpenlRVDZuTE96NjJNb0RCa2tRSFg5a1JsIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZrYllNRnUyYzBaQWN4cTAzdDE4MUlxTDBHeTNNQXlJSUhNSlpCOGVSN0c4UHBuWkJBVXRxbXB5bXFuUEZHWkJKNlhFQ0h4bEh4Qk1Dd1NKWDNzZFpCWkJobm5wclhLellGUXFwa3hhY3RNdFpBcGQ0SHFjM25MRTVJY1dHTHpVdmlsSDZra2FuZlMyMVMxcE84YXhuTUoyWEVnMmJVME9jd0lKc0dTblpCYSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjYxOTgwNzQxfQ; rur=\"PRN\\0548542681467\\0541693516936:01f792e65863e4284f0ef99c99cc7cd3b4946163204a765ac36f57e560edc425cf9ea0a9\"",
    "Referer": "https://www.instagram.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});


    let code = result.status
    return new ResultResponse(code, await result.text())
    if (code === 200) {
      var rawJson = await CheckSession(result)
      let user = rawJson.data.user
      console.log(rawJson)


      var profileEntity = new ProfileEntity(
        user.id,
        user.username,
        user.full_name,
        user.is_private,
        user.profile_pic_url_hd,
        user.is_verified,
        user.edge_followed_by.count,
        user.edge_follow.count,
        user.biography
      )

      return new ResultResponse(code, profileEntity)
    } else {
      return new ErrorModel(440, "Session Expire!!")
    }
  } catch (error) {
    console.log(error)
    return error
  }

}
