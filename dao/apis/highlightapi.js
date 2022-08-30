import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import HighlightModel from '../model/hightlight.js'

import fetch from 'node-fetch';


export async function GetHighlight(userId, headers) {
    try {
  
      if (headers.query_hash === undefined) {
        throw new ErrorModel(440, "Query Hash is missing in the header request")
      }
  
      let result = await fetch(`https://www.instagram.com/graphql/query/?query_hash=${headers.query_hash}&variables={"user_id":${userId},"include_chaining":true,"include_reel":true,"include_suggested_users":false,"include_logged_out_extras":false,"include_highlight_reels":true,"include_live_status":true}`)

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
    } catch (error) {
      console.log(error)
      return error
    }
  
  }
  