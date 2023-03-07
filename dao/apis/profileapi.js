import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';


const TAG = "ProfileApiTag"

const delay = time => new Promise(res => setTimeout(res, time));


export async function GetProfile(userId, userName, headers) {
  try {
    delete headers.host;

    let isLogin = true;

    let url = `https://i.instagram.com/api/v1/users/${userId}/info`
    if (headers.cookie === undefined) {
      url = `https://storiesig.info/api/ig/userInfoByUsername/${userName}`
      isLogin = false
    }

    let result = await fetch(url, {
      "headers": headers,
      "body": null,
      "method": "GET"
    });

    let code = result.status
    console.log(TAG, "Status Code:", code)
    if (code === 200) {
      var rawJson = await CheckSession(result)
      try {
        let user;
        if (isLogin) {
          user = rawJson.user
        } else {
          user = rawJson.result.user
        }

        if (user !== null) {
          var profileEntity = new ProfileEntity(
            user.pk,
            user.username,
            user.full_name,
            user.is_private,
            user.hd_profile_pic_versions[user.hd_profile_pic_versions.length - 1].url,
            user.is_verified,
            user.follower_count,
            user.following_count,
            user.biography,
            '',
          )
          return new ResultResponse(code, profileEntity)
        } else {
          return new ErrorModel(404, "User not found")
        }
      } catch (e) {
        return new ErrorModel(500, "Something went wrong. Error : " + e)
      }
    } else if (code === 429) {
      console.log(TAG, "Gonna Retry")
      await delay(30000)
      return await GetProfile(userId, userName, headers)
    }
    else {
      console.log(TAG, "Error:", await result.text())
      return new ErrorModel(404, "User not found")
    }
  } catch (error) {
    console.log(TAG, "Exception:", error)
    return error
  }

}
