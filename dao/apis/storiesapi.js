
import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';
import testingHeader from '../model/testingheader.js'
import { raw } from 'express';

import { GetProfile } from './profileapi.js'

export async function GetStories(userId, userName, headers) {
    try {
        delete headers.host;

        if (headers.cookie === undefined) {
            return await GetGuestStories(userId, userName, headers)
        } else {
            return await GetLoggedInUserStories(userId, headers)
        }

    } catch (e) {
        console.log(e)
        return new ErrorModel(code, e.message)
    }
}


/**
 * If user has logged in then this function will be called to get stoires and other 
 * details. 
 * @param {*} userId  user id of the Instagram user
 * @param {*} headers request headers. 
 * @returns 
 */
const GetLoggedInUserStories = async (userId, headers) => {
    var result = await fetch(`https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${userId}`, {
        "headers": headers,
        "body": null,
        "method": "GET"
    });

    var code = result.status
    if (code === 200) {
        var rawJson = await CheckSession(result)
        console.log(userId, rawJson)

        let reels = rawJson.reels[userId]
        
        if (typeof reels !== 'undefined') {

            let user = new ProfileEntity(
                reels.user.pk,
                reels.user.username,
                reels.user.full_name,
                reels.user.is_private,
                reels.user.profile_pic_url,
                reels.user.is_verified,
                0
            )

            let storyList = []
            reels.items.forEach((story) => {
                var item = {}
                item.time = story.taken_at
                item.id = userId
                item.user = user
                item.image_url = story.image_versions2.candidates[0].url

                item.accessibility_caption = story.accessibility_caption


                var vedio = story.video_versions
                if (vedio != null) {
                    item.video_url = vedio[0].url
                    item.video_duration = story.video_duration
                }

                storyList.push(item)
            })
            return new ResultResponse(code, storyList)
        } else {
            return new ResultResponse(code, [])
        }

    } else {
        var errorMessage = await result.text()
        return new ErrorModel(code, errorMessage)
    }

}



/**
 * In case if user is not logged in then we will use storyig api to get ONLY stories.
 * @param {*} userId User id of the user
 * @param {*} userName Username of the user
 * @param {*} headers request headers
 * @returns 
 */
const GetGuestStories = async (userId, userName, headers) => {
    let endpoint = 'stories'
    if(userId.includes("highlight")){
        endpoint = 'highlightStories'
    }
    console.log(`https://storiesig.info/api/ig/${endpoint}/${userId}`)
    var result = await fetch(`https://storiesig.info/api/ig/${endpoint}/${userId}`, {
        "headers": headers,
        "method": "GET"
    });


    var code = result.status
    if (code === 200) {

        var rawJson = await CheckSession(result)
        console.log("StoryIg Response",rawJson)
        let storyJsonArray = rawJson.result

        let userObject = null
        if (userName !== null) {
            userObject = await GetProfile(userId, userName, headers)
        }

        let stories = []
        if (typeof storyJsonArray !== 'undefined' && storyJsonArray.length > 0) {

            storyJsonArray.forEach(async (item) => {

                console.log(item.video_versions)

                let story = {}
                story.time = item.taken_at
                story.id = item.pk
                story.user_id = userId
                story.accessibility_caption = null
                story.is_video = item["video_versions"] !== undefined

                if (userObject !== null) {
                    story.user = userObject.result
                } else {
                    story.user = null
                }

                if (story.is_video) {
                    story.video_url = item.video_versions[0].url
                    story.video_duration = 0
                }

                story.image_url = item.image_versions2.candidates[0].url
                stories.push(story)

            })
            return new ResultResponse(code, stories)
        } else {
            return new ResultResponse(code, [])
        }

    } else {
        var errorMessage = await result.text()
        return new ErrorModel(code, errorMessage)
    }

}