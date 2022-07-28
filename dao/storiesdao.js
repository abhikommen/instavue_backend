import fetch from 'node-fetch';


async function getStories(userId) {
    var result = await fetch(`https://storiesig.info/api/ig/stories/${userId}`)
    var code = result.status

    if (code === 200) {
        var rawJson = await result.json()
        var json = {}
        json.id = userId
        json.count = rawJson.result.length
        json.story = []

        rawJson.result.forEach((story) => {
            var item = {}
            item.time = story.taken_at
            item.image_url = story.image_versions2.candidates[0].url
            var vedio = story.video_versions
            if (vedio != null) {
                item.video_url = vedio[0].url
            }

            json.story.push(item)
        })

        return json
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

async function getProfile(userName) {


    var result = await fetch(`https://storiesig.info/api/ig/profile/${userName}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
        },
        "referrer": "https://storiesig.info/en/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });

    var code = result.status
    if (code === 200) {
        var jsonResult = await result.json()
        var json = {}
        console.log(jsonResult)
        json.id = jsonResult.result.id
        json.username = jsonResult.result.username
        json.is_private = jsonResult.result.is_private
        json.pfp = jsonResult.result.profile_pic_url
        json.bio = jsonResult.result.biography
        json.name = jsonResult.result.full_name
        json.followers = jsonResult.result.edge_followed_by.count
        json.posts = jsonResult.result.edge_owner_to_timeline_media.count
        json.following = jsonResult.result.edge_follow.count
        return json
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
    getProfile: getProfile,
    getStories: getStories
}

export default storiesDao