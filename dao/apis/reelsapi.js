import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'


export async function GetReels(ids, headers) {
    try {
        console.log("First")
        if (ids === undefined) {
            console.log(ids)
            return new ResultResponse(200, [])
        }
        if (headers.cookie === undefined || headers.appid === undefined) {
            throw new ErrorModel(440, "Cookie or appid not present in the header request")
        }
        console.log("Second")

        let reelsId = ''
        if (Array.isArray(ids)) {
            ids.forEach((id) => {
                reelsId += "reel_ids=" + id + "&"
            })
        } else {
            reelsId = "reel_ids=" + ids
        }

        console.log("Third")
        var result = await fetch(`https://i.instagram.com/api/v1/feed/reels_media/?${reelsId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
                "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"104\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-asbd-id": "198387",
                "x-ig-app-id": headers.appid,
                "cookie": headers.cookie,
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
        console.log("Fourth")
        var code = result.status
        return new ResultResponse(200, await result.text())
        if (code === 200) {
            var rawJson = await CheckSession(result)
            return new ResultResponse(200, rawJson)
            let jsonArray = []
            rawJson.reels_media.forEach((tray) => {
                tray.items.forEach((item) => {
                    let story = {}
                    story.time = item.taken_at
                    story.id = item.pk
                    story.user_id = tray.user.pk
                    story.accessibility_caption = item.accessibility_caption
                    story.is_video = item.media_type === 2

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