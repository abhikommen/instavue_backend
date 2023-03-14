import LoginProfileApi from './login_profileapi.js';
import NoLoginProfileApi from './nologin_profileapi.js';
import ErrorModel from '../../model/error.js';

export async function GetProfile(userId, userName, headers) {
  try {

    if (headers.cookie === undefined) {
      throw new ErrorModel(401, "Cookie not present in the header request")
    }

    let isLoggedInRequest = true
    if (headers.queryhash === undefined) {
      isLoggedInRequest = false
    }

    if (isLoggedInRequest) {
      return await LoginProfileApi(userId, headers)
    } else {
      return await NoLoginProfileApi(userName, headers)
    }

  } catch (error) {
    return error
  }

}
