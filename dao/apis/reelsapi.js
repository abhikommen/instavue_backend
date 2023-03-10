import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';
import testingHeader from '../model/testingheader.js'


export async function GetReels(ids, headers) {
    try {
        delete headers.host;
        if (ids === undefined) {
            console.log(ids)
            return new ResultResponse(200, [])
        }
        if (headers.cookie === undefined) {
            headers = testingHeader
            // throw new ErrorModel(401, "Cookie not present in the header request")
        }

        let reelsId = ''
        if (Array.isArray(ids)) {
            ids.forEach((id) => {
                reelsId += "reel_ids=" + id + "&"
            })
        } else {
            reelsId = "reel_ids=" + ids
        }

        var result = await fetch(`https://i.instagram.com/api/v1/feed/reels_media/?${reelsId}`, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });

        var code = result.status
        if (code === 200) {
            var rawJson = await CheckSession(result)
            let jsonArray = []
            rawJson.reels_media.forEach((tray) => {
                tray.items.forEach((item) => {
                    let story = {}
                    story.time = item.taken_at
                    story.id = item.pk
                    story.user_id = tray.user.pk
                    story.accessibility_caption = item.accessibility_caption
                    story.is_video = item.media_type === 2
                    story.is_close_story = (item.audience !== null && item.audience === "besties")

                    story.user = new ProfileEntity(
                        tray.user.pk,
                        tray.user.username,
                        tray.user.full_name,
                        tray.user.is_private,
                        tray.user.profile_pic_url,
                        tray.user.is_verified,
                    )

                    if (story.is_video) {
                        story.video_url = item.video_versions[0].url
                        story.video_duration = item.video_duration
                    }

                    story.image_url = item.image_versions2.candidates[0].url
                    jsonArray.push(story)
                })
            })
            return new ResultResponse(code, jsonArray)
        } else {
            return new ErrorModel(440, "Session Expire!!")
        }

    } catch (error) {
        console.log("error", error)
        return new ErrorModel(405, error)
    }

}