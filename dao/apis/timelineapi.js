import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import { GetHighlightList } from './highlightapi.js'
import { GetProfile } from './profileapi.js'
import { GetReels } from "./reelsapi.js"
import { GetStories } from './storiesapi.js'


const TAG = "TimeLineApiTag"

export async function GetTimeline(userId, userName, headers) {

    try {
        delete headers.host;
        console.log(TAG + " for:", userId, userName)
        
        let resultJson = {}
        const highlightList = await GetHighlightList(userId, headers)
        const userInfo = await GetProfile(userId, userName, headers)
        const storiesList = await GetStories(userId, userName, headers)

        resultJson.highlights = highlightList.result
        resultJson.user = userInfo.result
        resultJson.story = storiesList.result

        return new ResultResponse(200, resultJson)

    } catch (error) {
        console.log(TAG, "Error", error)
        return error
    }

}