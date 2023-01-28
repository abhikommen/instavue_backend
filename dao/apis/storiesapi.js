
import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';


export async function GetStories(userId, headers) {
    let searchedUserId = userId

    try {

        if (headers.cookie === undefined) {
            throw new ErrorModel(401, "Cookie not present in the header request")
        }

        var result = await fetch(`https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${userId}`, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });

        var code = result.status
        if (code === 200) {
            var rawJson = await CheckSession(result)
            var json = {}
            let reels = rawJson.reels[searchedUserId]
            console.log(reels)
            if (typeof reels !== 'undefined') {
                console.log(reels)
                json.id = reels.id
                json.last_story_time = reels.latest_reel_media
                json.count = reels.media_count
                json.user = new ProfileEntity(
                    reels.user.pk,
                    reels.user.username,
                    reels.user.full_name,
                    reels.user.is_private,
                    reels.user.profile_pic_url,
                    reels.user.is_verified,
                    0
                )
                json.story = []
                reels.items.forEach((story) => {
                    var item = {}
                    item.time = story.taken_at
                    item.id = userId
                    item.image_url = story.image_versions2.candidates[0].url
                    var vedio = story.video_versions
                    if (vedio != null) {
                        item.video_url = vedio[0].url
                        item.video_duration = story.video_duration
                    }

                    json.story.push(item)
                })
                return new ResultResponse(code, json)
            } else {
                let json = {}
                json.id = userId
                json.last_story_time = 0
                json.count = 0
                json.story = []
                return new ResultResponse(code, json)
            }

        } else {
            var errorMessage = await result.text()
            return new ErrorModel(code, errorMessage)
        }
    } catch (e) {
        return new ErrorModel(code, e.message)
    }

}
