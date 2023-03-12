import { CheckSession } from '../../../util/util.js'
import ProfileEntity from '../../model/profilemodel.js'
import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import fetch from 'node-fetch';
import { GetProfile } from '../profile/profileapi.js';


const TAG = "StoriesApiTag"


const NoLoginStoriesApi = async (userId, userName, headers) => {

    console.log("😳", userId)

    if (userId.includes('high')) {
        // its a hightlight
        return await GetHightlight(userId, userName, headers)
    } else {
        return await GetStory(userName, headers)
    }

}

const GetHightlight = async (userId, userName, headers) => {

    const highlightId = userId.match(/\d+/g)

    try {

        var apiResult = await fetch("https://instanavigation.com/get-highlight-stories", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,ja;q=0.7",
                "content-type": "application/json;charset=UTF-8",
                "x-xsrf-token": decodeURIComponent(headers["x-xsrf-token"]),
                "cookie": decodeURIComponent(headers.cookie),
            },
            "body": `{\"highlightId\":\"${highlightId}\"}`,
            "method": "POST"
        });

        const statusCode = apiResult.status

        if (statusCode === 200) {

            let storyList = []
            if (apiResult !== null) {

                var profileEntity = await GetProfile(userId, userName, headers)
                var jsonResponse = await apiResult.json()

                jsonResponse.forEach((story) => {
                    var item = {}

                    item.time = getUTCTimeHighLight(story.createdTime)
                    item.id = profileEntity.id
                    item.user = profileEntity
                    item.image_url = story.thumbnailUrl

                    item.accessibility_caption = null

                    var videoUrl = story.videoUrl
                    if (videoUrl != null) {
                        item.video_url = videoUrl
                        item.video_duration = 100
                    }

                    storyList.push(item)
                })
            }
            return new ResultResponse(statusCode, storyList)
        }
        else {
            return new ErrorModel(statusCode, "Something went wrong :(")
        }
    } catch (error) {
        throw new ErrorModel(440, "Session Expire!!")
    }

}


const GetStory = async (id, headers) => {
    console.log("GetStory Called", id)
    try {
        const apiResult = await fetch("https://instanavigation.com/get-user-info", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,ja;q=0.7",
                "content-type": "application/json;charset=UTF-8",
                "sec-fetch-site": "same-origin",
                "x-xsrf-token": decodeURIComponent(headers["x-xsrf-token"]),
                "cookie": decodeURIComponent(headers.cookie),
                "Referer": `https://instanavigation.com/profile/${id}`,
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"userName\":\"${id}\"}`,
            "method": "POST"
        });

        var statusCode = apiResult.status
        console.log("status code", statusCode)
        if (statusCode === 200) {

            const jsonResponse = await apiResult.json()
            try {
                let storyList = []
                console.log(jsonResponse)
                if (jsonResponse !== null) {

                    var profileEntity = new ProfileEntity(
                        jsonResponse.accountInfo.id,
                        jsonResponse.accountInfo.username,
                        jsonResponse.accountInfo.fullName,
                        jsonResponse.accountInfo.isPrivate,
                        jsonResponse.accountInfo.profilePicUrl,
                        false,
                        jsonResponse.accountInfo.followsCount,
                        jsonResponse.accountInfo.followedByCount,
                        jsonResponse.accountInfo.biography,
                        '',
                    )

                    jsonResponse.lastStories.forEach((story) => {
                        var item = {}

                        item.time = getUTCTime(story.createdTime)
                        item.id = profileEntity.id
                        item.user = profileEntity
                        item.image_url = story.thumbnailUrl

                        item.accessibility_caption = null

                        var videoUrl = story.videoUrl
                        if (videoUrl != null) {
                            item.video_url = videoUrl
                            item.video_duration = 100
                        }

                        storyList.push(item)
                    })
                    console.log(storyList)
                    return new ResultResponse(statusCode, storyList)
                } else {
                    return new ErrorModel(404, "User not found")
                }
            } catch (e) {
                console.log(TAG, e)
                return new ErrorModel(500, "Something went wrong. Error : " + e)
            }
        } else {
            console.log(TAG, "Error:", await apiResult.text())
            return new ErrorModel(statusCode, "User not found")
        }
    } catch (error) {
        console.log(error)
        throw new ErrorModel(440, "Session Expire!!")
    }
}

const getUTCTimeHighLight = (hms) => {
    var Currentdate = new Date(hms);
    return (Currentdate.getTime() - Currentdate.getTimezoneOffset() * 60000) / 1000;
}


const getUTCTime = (hms) => {

    var today = new Date(Date.now());

    var dd = String(today.getUTCDate()).padStart(2, '0');
    var mm = String(today.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getUTCFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var newDate = new Date(today)
    //newDate.setDate(newDate.getDate() - 1);

    var a = hms.split(':'); // split it at the colons
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    const utcTime = newDate.getTime() - newDate.getTimezoneOffset() * 60000
    const finalUtcTime = utcTime + seconds * 1000
    console.log(finalUtcTime)
    return finalUtcTime / 1000
}


export default NoLoginStoriesApi