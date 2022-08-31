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
        "x-ig-app-id": headers.appid,
        "cookie": headers.cookie,
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
