
import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';


export async function TrayApi(headers) {
  try {
    delete headers.host;

    console.log("Tray Api:", headers)
    if (headers.cookie === xundefined) {
      throw new ErrorModel(401, "Cookie not present in the header request")
    }

    var result = await fetch("https://i.instagram.com/api/v1/feed/reels_tray/", {
      "headers": headers,
      "body": null,
      "method": "GET"
    });
    let code = result.status
    console.log(code)
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
      return new ErrorModel(440, "Session Expire!!")
    }
  } catch (e) {
    return e
  }
}