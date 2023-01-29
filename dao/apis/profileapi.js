import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';



export async function GetProfile(userName, headers) {
  try {
    delete headers.host;
    if (headers.cookie === undefined) {
      throw new ErrorModel(401, "Cookie not present in the header request")
    }

    let result = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}&hl=en`, {
      "headers": headers,
      "body": null,
      "method": "GET"
    });

    let code = result.status
    if (code === 200) {
      var rawJson = await CheckSession(result)
      try {
        let user = rawJson.data.user
        if (user !== null) {
          var profileEntity = new ProfileEntity(
            user.id,
            user.username,
            user.full_name,
            user.is_private,
            user.profile_pic_url_hd,
            user.is_verified,
            user.edge_followed_by.count,
            user.edge_follow.count,
            user.biography,
            '',
            user.followed_by_viewer
          )
          return new ResultResponse(code, profileEntity)
        } else {
          return new ErrorModel(404, "User not found")
        }
      } catch (e) {
        return new ErrorModel(500, "Something went wrong. Error : " + e)
      }
    } else {
      return new ErrorModel(404, "User not found")
    }
  } catch (error) {
    return error
  }

}
