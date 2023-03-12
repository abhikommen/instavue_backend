
import ErrorModel from '../../model/error.js'

import LogInUserStories from './login_storiesapi.js';
import NoLoginStoriesApi from './nologin_storiesapi.js';

export async function GetStories(userId, userName, headers) {
    try {
        delete headers.host;
        
        if (headers.cookie === undefined) {
            throw new ErrorModel(401, "Cookie not present in the header request")
        }

        let isLoggedInRequest = true
        if (headers.queryhash === undefined) {
            isLoggedInRequest = false
        }

        if (isLoggedInRequest) {
            return await LogInUserStories(userId, headers)
        } else {
            return await NoLoginStoriesApi(userId, userName, headers)
        }

    } catch (e) {
        console.log(e)
        return new ErrorModel(404, e.message)
    }
}

