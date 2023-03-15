import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import { GetHighlightList } from './highlightlist/highlightapi.js'
import { GetProfile } from './profile/profileapi.js'
import { GetReels } from "./reelsapi.js"
import { GetStories } from './story/storiesapi.js'

const TAG = "TimeLineApiTag"

export async function GetTimeline(userId, userName, headers) {

    try {
        delete headers.host;

        if (headers.cookie === undefined) {
            throw new ErrorModel(401, "Cookie not present in the header request")
        }

        let isLoggedInRequest = true
        if (headers.queryhash === undefined) {
            isLoggedInRequest = false
        }

        let resultJson = {}

        const highlightList = await GetHighlightList(userId, userName, headers)
        const userInfo = await GetProfile(userId, userName, headers)
        const storiesList = await GetStories(userId, userName, headers)

        resultJson.highlights = highlightList.result
        resultJson.user = userInfo.result
        resultJson.story = storiesList.result

        return new ResultResponse(200, resultJson)

    } catch (error) {
        console.log(TAG, "Error", error)
        return new ErrorModel(404, "Something went wrong ")
    }

}