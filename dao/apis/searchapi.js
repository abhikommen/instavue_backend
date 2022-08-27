import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';


export async function SearchProfile(userName, headers) {

    try {

        if (headers.cookie === undefined || headers.appid === undefined) {
            throw new ErrorModel(440, "Cookie or appid not present in the header request")
        }

        let result = await fetch(`https://www.instagram.com/web/search/topsearch/?query=${userName}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
            },
            "body": null,
            "method": "GET",
            "mode": "cors",
            "x-ig-app-id": headers.appid,
            "cookie": headers.cookie,
            "credentials": "include"
        });

        var code = result.status
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