import fetch from 'node-fetch';
import ProfileEntity from './model/profilemodel.js'


async function getStories(userId) {
  let searchedUserId = userId

  try {
    var result = await fetch(`https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${userId}`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-asbd-id": "198387",
        "x-csrftoken": "Zet6vVN6xoJp5AqiPL2qG0CRJoCau2dQ",
        "x-ig-app-id": "936619743392459",
        "x-ig-www-claim": "hmac.AR24wR_VUVv1fn1tC5fefxoL9BMfXltnklJmoDSI2ZqEOi0D",
        "Referer": "https://www.instagram.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    var code = result.status

    if (code === 200) {
      var rawJson = await result.json()
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
        return json
      } else {
        let json = {}
        json.id = userId
        json.last_story_time = 0
        json.count = 0
        json.story = []
        return json
      }

    } else {
      var errorMessage = await result.text()
      return {
        "error": {
          "code": 404,
          "message": errorMessage
        }
      }
    }
  } catch (e) {
    return {
      "error": {
        "code": 404,
        "message": e.message
      }
    }
  }

}


async function getTray(headers) {
  try {
    var result = await fetch("https://i.instagram.com/api/v1/feed/reels_tray/", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"104\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-ig-app-id": headers.appid,
        "x-ig-www-claim": "0",
        "cookie": headers.cookie,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    var code = result.status

    if (code === 200) {
      var rawJson = await result.json()

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

        if(tray.items !== undefined){
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

              if(story.is_video){
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

      return jsonArray
    } else {
      var errorMessage = await result.text()
      return {
        "error": {
          "code": 404,
          "message": errorMessage
        }
      }
    }
  } catch (e) {
    return {
      "error": {
        "code": 404,
        "message": e.message
      }
    }
  }

}


async function searchProfile(userName) {

  try {
    let result = await fetch(`https://www.instagram.com/web/search/topsearch/?query=${userName}`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
      },
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });


    var code = result.status
    if (code === 200) {
      var jsonResult = await result.json()
      var jsonArray = []

      jsonResult.users.forEach((user) => {

        var profileEntity = new ProfileEntity(
          user.user.pk,
          user.user.username,
          user.user.full_name,
          user.user.is_private,
          user.user.profile_pic_url,
          user.user.is_verified,
          user.user.latest_reel_media
        )
        jsonArray.push(profileEntity)
      })
      return jsonArray
    } else {
      var errorMessage = await result.text()
      return {
        "error": {
          "code": 404,
          "message": errorMessage
        }
      }
    }
  } catch (e) {
    return {
      "error": {
        "code": 404,
        "message": e.message
      }
    }
  }
}

async function getReels(ids, headers){
  let reelsId = ''
  ids.forEach((id)=> {
    reelsId += "reel_ids=" + id +  "&"
  })
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
      "x-ig-www-claim": "hmac.AR24wR_VUVv1fn1tC5fefxoL9BMfXltnklJmoDSI2ZqEOl5v",
      "cookie": headers.cookie,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  let rawJson =  await result.json()
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

      if(story.is_video){
        story.video_url = item.video_versions[0].url
        story.video_duration = item.video_duration
      }

      story.image_url = item.image_versions2.candidates[0].url
      jsonArray.push(story)
    })
  })
return jsonArray
}


async function getProfile(userName) {

  let result = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
      "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-asbd-id": "198387",
      "x-csrftoken": "Zet6vVN6xoJp5AqiPL2qG0CRJoCau2dQ",
      "x-ig-app-id": "936619743392459",
      "x-ig-www-claim": "hmac.AR24wR_VUVv1fn1tC5fefxoL9BMfXltnklJmoDSI2ZqEOli9",
      "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; csrftoken=Zet6vVN6xoJp5AqiPL2qG0CRJoCau2dQ; ds_user_id=8447464191; sessionid=8447464191%3A9vtTHTpoRVUJvO%3A17; shbid=\"10450\\0548447464191\\0541691144021:01f701719e7f77c25e9d7d6b7bb7744fac70713500ef37c62aea77785ee8216f2bd02595\"; shbts=\"1659608021\\0548447464191\\0541691144021:01f74cbc2f993660f39abbdf4786f8f2cbd1bd3c74433228b88c9557a8f2353c771d635a\"; dpr=2.5; fbsr_124024574287414=8JtAjagoZKbEfb2uO6NkGGUk3tOoj1zX-99EqAZYs8Y.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRQ1BBVUNxTm5YYmJmRHRESWI5QzRHZkZfdF83ODRYUVd1eWdQNzNRNnhSMTRTQ3RiMEJkay14MEJLcHk2TzlpdzlMNzE2NUk1OFVXZklUdEpRQk53a3JuTFc4cFhSRzF2b19NU2U4ZlpPTFNtb1Y2OUVud2dOVXVObGdkNVZPRjZjek1TWnhBTkJicEg5dUFGOTNZd21LNDVEZmg2R0FzV21va3J5YjVHUGNWWFIyVWQ3WWlfcmpZa2QzREI3bWREdGFReGJrNTZzcjljcnJhY1hNSUQ1WG9mTVZsWGtOUUdMUVA3TzFkbHlKa3c0VFdPSnRBdGZQNTAwdGs5VTdPZ3BQbDNYNjFUX1RaZGJSQ0g5Qmk5M0lJZjVlN0ozaVhtNGNPZjlHZGhReWdpdGhmWWFPamoybjhyOVllN1I5MVB2Mm54d1ZhVTZwSDZpZnY5NFFHOHlrIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQU9LbGplZklNdE54SEFKZ2VrdE9QTHExWkI4TzByTk1qakdFRm5OVXRVZFZiSGxTa05OTHpmYVpBNTl4TkpZM1pBVEFnRG9tVWFXS1hvamFuN0Z2Y0tpR002enBQVDVzak5VQVpDcWJtMTlHS1JtRVE2Z0ZwVktOZDV5ckxIcDVtSjhzZlJpbGhyZXNLSG9aQ3ZXbDJkdUdkcXdiQ0NjVDlLb1pBRGJUVGMiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY1OTc5Mjg0N30; rur=\"NAO\\0548447464191\\0541691328919:01f70d4afa8f6a9da452f4facab007c3fbc4e2388f588c30fb1e81f13fe8435ef4561e0c\"",
      "Referer": "https://www.instagram.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  var code = result.status

  if (code === 200) {
    let jsonResult = await result.json()
    let user = jsonResult.data.user

    var profileEntity = new ProfileEntity(
      user.id,
      user.username,
      user.full_name,
      user.is_private,
      user.profile_pic_url_hd,
      user.is_verified,
      0,
      user.edge_followed_by.count,
      user.edge_follow.count,
      user.biography
    )

    return profileEntity
  } else {
    var errorMessage = await result.text()
    return {
      "error": {
        "code": 404,
        "message": errorMessage
      }
    }
  }
}



const storiesDao = {
  searchProfile: searchProfile,
  getProfile: getProfile,
  getStories: getStories,
  getTray: getTray,
  getReels : getReels
}

export default storiesDao
