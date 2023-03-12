
import NoLoginHighlightApi from './nologinhighlightapi.js';
import LoginHighlightApi from './loginhighlightapi.js';

const TAG = "HighlightListApiTag"


export async function GetHighlightList(userId, userName, headers) {

  try {
    delete headers.host;

    if (headers.cookie === undefined) {
      throw new ErrorModel(401, "Cookie not present in the header request")
    }

    let isLoggedInRequest = true
    if (headers.queryhash === undefined) {
      isLoggedInRequest = false
    }

    console.log("Highlight called", isLoggedInRequest)

    if (isLoggedInRequest === true) {
      return await LoginHighlightApi(userId, headers)
    } else {
      console.log("Highlight called", isLoggedInRequest)
      return await NoLoginHighlightApi(userId, userName, headers)
    }

  } catch (error) {
    console.log(error)
    return error
  }

}
