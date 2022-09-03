import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';

export async function SearchProfile(userName, headers) {

    try {

        if (headers.cookie === undefined || headers.appid === undefined) {
            throw new ErrorModel(401, "Cookie or appid not present in the header request")
        }

        let result = await fetch(`https://i.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${userName}`, {
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
                "cookie": headers.cookie,
                "Referer": "https://www.instagram.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });

        var code = result.status
        console.log(code)
        if (code === 200) {
            var jsonResult = await CheckSession(result)
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
            return new ResultResponse(code, jsonArray)
        } else {
            return new ErrorModel(440, "Session Expire!!")
        }
    } catch (error) {
        return error
    }

}