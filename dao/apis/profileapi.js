import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'


export async function GetProfile(userName, headers) {

  try {
    if (headers.cookie === undefined || headers.appid === undefined) {
      throw new ErrorModel(440, "Cookie or appid not present in the header request")
    }

    let result = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-asbd-id": "198387",
        "x-csrftoken": "Zet6vVN6xoJp5AqiPL2qG0CRJoCau2dQ",
        "x-ig-app-id": headers.appid,
        "x-ig-www-claim": "hmac.AR24wR_VUVv1fn1tC5fefxoL9BMfXltnklJmoDSI2ZqEOli9",
        "cookie": headers.cookie,
        "Referer": "https://www.instagram.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    var code = result.status
    if (code === 200) {
      var rawJson = await CheckSession(result)
      let user = rawJson.data.user

      var profileEntity = new ProfileEntity(
        user.id,
        user.username,
        user.full_name,
        user.is_private,
        user.profile_pic_url_hd,
        user.is_verified,
        0,
        user.edge_followed_by.count,
        user.edge_follow.count,
        user.biography
      )
      return new ResultResponse(code, profileEntity)
    } else {
      return new ErrorModel(440, "Session Expire!!")
    }
  } catch (error) {
    return error
  }

}
