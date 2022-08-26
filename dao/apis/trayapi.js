
import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'

export async function TrayApi(headers) {
  try {

    if (headers.cookie === undefined || headers.appid === undefined) {
      throw new ErrorModel(440, "Cookie or appid not present in the header request")
    }

    var result = await fetch("https://i.instagram.com/api/v1/feed/reels_tray/", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "x-ig-app-id": headers.appid,
        "cookie": headers.cookie,
      },
      "body": null,
      "method": "GET"
    });

    var code = result.status
    if (code === 200) {

      var rawJson = await CheckSession(result)
      var jsonArray = []

      rawJson.tray.forEach((tray) => {
        let trayJson = {}
        trayJson.id = tray.id
        trayJson.is_close_friend = tray.has_besties_media
        trayJson.story_count = tray.media_count
        trayJson.user = new ProfileEntity(
          tray.user.pk,
          tray.user.username,
          tray.user.full_name,
          tray.user.is_private,
          tray.user.profile_pic_url,
          tray.user.is_verified,
        )

        if (tray.items !== undefined) {
          let stories = []
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
            stories.push(story)
          });
          trayJson.stories = stories
        }

        jsonArray.push(trayJson)

      })
      return new ResultResponse(code, jsonArray)
    } else {
      var errorMessage = await result.text()
      return new ErrorModel(code, errorMessage)
    }
  } catch (e) {
    return e
  }

}