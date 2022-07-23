import fetch from 'node-fetch';


async function getStories(userId) {
    var result = await fetch(`https://storiesig.info/api/ig/stories/${userId}`)
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
}

async function getProfile(userName) {
    var result = await fetch(`https://storiesig.info/api/ig/profile/${userName}`, {
        "headers": {
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-token": "null",
            "Referer": "https://storiesig.info/en/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    try {
        var json = {}
        var jsonResult = await result.json()
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
    } catch (error) {
        return {
            "error": {
                "code": 404,
                "message": "Username not found"
            }
        }
    }
}

const storiesDao = {
    getProfile: getProfile,
    getStories: getStories
}

export default storiesDao