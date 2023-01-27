import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import HighlightModel from '../model/hightlight.js'
import { LoginApi } from './loginapi.js'
import { GetHighlight } from './highlightapi.js'
import { GetProfile } from './profileapi.js'
import { GetReels } from "./reelsapi.js"

import fetch from 'node-fetch';


export async function GetTimeline(userId, userName, headers) {

    try {
        console.log(headers)
        if (headers.cookie === undefined || headers.appid === undefined) {
            throw new ErrorModel(401, "Cookie or appid not present in the header request")
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