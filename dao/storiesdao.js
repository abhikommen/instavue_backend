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
        rawJson.result.reverse()
        if (rawJson.result.length > 0) {
            json.last_story_time = rawJson.result[0].taken_at
        }

        rawJson.result.forEach((story) => {
            var item = {}
            item.time = story.taken_at
            item.id = userId
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
    let result = await fetch(`https://www.instagram.com/web/search/topsearch/?query=${userName}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
            "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; csrftoken=Zet6vVN6xoJp5AqiPL2qG0CRJoCau2dQ; ds_user_id=8447464191; sessionid=8447464191%3A9vtTHTpoRVUJvO%3A17; shbid=\"10450\\0548447464191\\0541691144021:01f701719e7f77c25e9d7d6b7bb7744fac70713500ef37c62aea77785ee8216f2bd02595\"; shbts=\"1659608021\\0548447464191\\0541691144021:01f74cbc2f993660f39abbdf4786f8f2cbd1bd3c74433228b88c9557a8f2353c771d635a\"; dpr=2.5; fbsr_124024574287414=GarbpbgTX4KCS0PPKcu1vQCeC_TMSvUg6CmcBhZQwBg.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRQ1BGckpTRzRBd0FaM3liYTVaUnRwLUxPNVFhdE5Zd2NQaW9vVU1oMGtJOHFpdFNRdExjODRELTZpS3hvRU1ROF9nTmtVdkJLRWJuUk9Kc29ITWhBWU92S29SZVB5d2JtbG9zeV93TXBWV1NXeFF3UGVmV25hNDFQR081Zm1oUjljbm0ySjNkWk8wYVlhUEZaaEczbjBXVU9mdDZXM0hNbzFXNFVoTEdFaUhoQlNPWFJjNzdPNDFkYVBRZ0tzalZVZmQ5SG1ISFdZSkNFZXJWMkhxVGN5aGZ4OS1TTjNtRUZnTG52TEFWaTVCZENBNW5pS3ppUUg5RmdNT3AwbFhQaTNKNmc3T1lSNnpWUVItZ25VV25JcTlFNGF6ZHdHYTBJcUdMMTYzdlltVUszSDJGSDBIa3hEcDJzOHNEUzhEbVQzTFZCcE94TWVfTzZaSmdJcmowYUZ6Iiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQU9panE3R1dDbTZmcE55dHU4TnVDQVY5dkNYcDdaQlc1Y013dHQ3NzRwSE9FM3dVMkNIUWRHajRIZUQ2TTZaQ0FHYnRBQnZOVlM4aGxSNkdMMHJMWkFQRGtoOXhWVVZlWkNqSTRvY0V1aDJsbVRiWkNaQlZYcldkdFM3bHdDcTM4ZU54WW9yWkEzNm9TbHRaQk1iTUtaQ0JyRXJiVnRyeWtzWkNNRzF6d3N6Y2FiIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2NTk3NzIwNDl9; rur=\"NAO\\0548447464191\\0541691308080:01f7dea1247d34fde94a5b2fbaedc6f4c88c66acd726252282ecc5535da43653a38532d3\"",
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
            var json = {}
            json.id = user.user.pk
            json.username = user.user.username
            json.full_name = user.user.full_name
            json.is_private = user.user.is_private
            json.pfp = user.user.profile_pic_url
            json.is_verified = user.user.is_verified
            json.last_story = user.user.latest_reel_media
            jsonArray.push(json)
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
}

const storiesDao = {
    getProfile: getProfile,
    getStories: getStories
}

export default storiesDao