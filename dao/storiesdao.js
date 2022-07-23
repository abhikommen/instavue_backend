import fetch from 'node-fetch';

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
    try{
        var json = {}
        var jsonResult = await result.json()
        json.id = jsonResult.result.id
        json.username = jsonResult.result.username
        json.is_private = jsonResult.result.is_private
        json.pfp = jsonResult.result.profile_pic_url
        json.bio = jsonResult.result.biography
        json.name = jsonResult.result.full_name
        json.followers = jsonResult.result.edge_followed_by.count
        json.following = jsonResult.result.edge_follow.count

        return json
    } catch(error){
        return {
            "error": {
              "code": 404,
              "message": "Username not found"
            }
          }
    } 
}


const storiesDao = {
    getProfile: getProfile
}

export default storiesDao