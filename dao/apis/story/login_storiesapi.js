

import { CheckSession } from '../../../util/util.js'
import ProfileEntity from '../../model/profilemodel.js'
import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import fetch from 'node-fetch';


const LogInUserStories = async (userId, headers) => {
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
                item.id = story.id
                item.user_id = userId
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

export default LogInUserStories