import { CheckSession } from '../../../util/util.js'
import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import HighlightModel from '../../model/hightlight.js'
import fetch from 'node-fetch';

/**
 * Get Hightlight from the user logged in credentials. 
 * @param {*} userId 
 * @param {*} headers 
 * @returns 
 */
const LoginHighlightApi = async (userId, headers) => {

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

export default LoginHighlightApi