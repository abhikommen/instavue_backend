import { CheckSession } from '../../util/util.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import HighlightModel from '../model/hightlight.js'
import testingHeader from '../model/testingheader.js'

import HttpsProxyAgent from 'https-proxy-agent'

import fetch from 'node-fetch';

const TAG = "HighlightListApiTag"

const delay = time => new Promise(res => setTimeout(res, time));

export async function GetHighlightList(userId, headers) {

  console.log(TAG, headers)

  try {
    delete headers.host;
    if (headers.cookie === undefined || headers.queryhash === undefined) {
      return await GetGuestHighlightList(userId)
    } else {
      return await GetLoggedInHighlightList(userId, headers)
    }

  } catch (error) {
    console.log(error)
    return error
  }

}

/**
 * Get user's highlights from StoriesIg. 
 * @param {*} userId 
 * @returns 
 */
const GetGuestHighlightList = async (userId) => {
  // if user is not logged in. 

  let result = await fetch(`https://storiesig.info/api/ig/highlights/${userId}`)
  let code = result.status

  console.log(TAG, "Status Code:", code)
  if (code === 200) {

    var rawJson = await CheckSession(result)
    const highlightsArray = []

    rawJson.result.forEach((edge) => {
      let highlight = new HighlightModel(
        edge.id.replace(/[^0-9]/g, ''),
        edge.title,
         edge.cover_media.cropped_image_version.url
      )
      highlightsArray.push(highlight)
    })
    return new ResultResponse(code, highlightsArray)
  } else if (code === 429) {
    console.log(TAG, "Gonna Retry")
    await delay(30000)
    return await GetGuestHighlightList(userId)
  } else {
    console.log(TAG, "Error Result :", await result.text())
    return new ErrorModel(440, "Session Expire!!")
  }

}


/**
 * Get Hightlight from the user logged in credentials. 
 * @param {*} userId 
 * @param {*} headers 
 * @returns 
 */
const GetLoggedInHighlightList = async (userId, headers) => {

  let result = await fetch(`https://www.instagram.com/graphql/query/?query_hash=${headers.queryhash}&variables={"user_id":${userId},"include_chaining":true,"include_reel":true,"include_suggested_users":false,"include_logged_out_extras":false,"include_highlight_reels":true,"include_live_status":true}`, {
    "headers": headers,
    "body": null,
    "method": "GET"
  })

  let code = result.status

  if (code === 200) {
    var rawJson = await CheckSession(result)
    const highlightsArray = []

    rawJson.data.user.edge_highlight_reels.edges.forEach((edge) => {
      let highlight = new HighlightModel(
        edge.node.id,
        edge.node.title,
        edge.node.cover_media_cropped_thumbnail.url
      )
      highlightsArray.push(highlight)
    })

    return new ResultResponse(code, highlightsArray)
  } else {
    return new ErrorModel(440, "Session Expire!!")
  }

}