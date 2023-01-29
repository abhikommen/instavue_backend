import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import { GetHighlight } from './highlightapi.js'
import { GetProfile } from './profileapi.js'
import { GetReels } from "./reelsapi.js"


export async function GetTimeline(userId, userName, headers) {

    try {
        delete headers.host;

        if (headers.cookie === undefined) {
            throw new ErrorModel(401, "Cookie not present in the header request")
        }

        let resultJson = {}
        const highlights = await GetHighlight(userId, headers)
        const profile = await GetProfile(userName, headers)
        const story = await GetReels(userId, headers)

        resultJson.highlights = highlights.result
        resultJson.user = profile.result
        resultJson.story = story.result

        return new ResultResponse(200, resultJson)

    } catch (error) {
        return error
    }

}