import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import HighlightModel from '../../model/hightlight.js'


/**
 * Get user's highlights from StoriesIg. 
 * @param {*} userId 
 * @returns 
 */
const NoLoginHighlightApi = async (userId, userName, headers) => {

  try {

    var myHeaders = new Headers();
    myHeaders.append("authority", "instanavigation.com");
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-GB,en;q=0.9,en-US;q=0.8,ja;q=0.7");
    myHeaders.append("content-type", "application/json;charset=UTF-8");
    myHeaders.append("cookie", decodeURIComponent(headers.cookie));
    myHeaders.append("origin", "https://instanavigation.com");
    myHeaders.append("x-xsrf-token", decodeURIComponent(headers["x-xsrf-token"]));

    var raw = `{\"userName\":\"${userName}\",\"userId\":${userId}}`;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    var response = await fetch("https://instanavigation.com/get-user-highlights", requestOptions)
    var jsonResponse = await response.json()

    const highlightsArray = []
    console.log("🥺", myHeaders)
    jsonResponse.forEach((edge) => {
        let highlight = new HighlightModel(
            edge.id,
            edge.title,
            edge.imageThumbnail
        )
        highlightsArray.push(highlight)
    })

    return new ResultResponse(200, highlightsArray)
  } catch (error) {
    console.log(error)
    throw new ErrorModel(440, "Session Expire!!")
  }

}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


export default NoLoginHighlightApi