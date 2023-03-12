import { CheckSession } from '../../../util/util.js'
import ProfileEntity from '../../model/profilemodel.js'
import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import fetch from 'node-fetch';

const TAG = "ProfileApiTag"

const NoLoginProfileApi = async (userName, headers) => {
    try {
        const apiResult = await fetch("https://instanavigation.com/get-user-info", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,ja;q=0.7",
                "content-type": "application/json;charset=UTF-8",
                "sec-fetch-site": "same-origin",
                "x-xsrf-token": decodeURIComponent(headers["x-xsrf-token"]),
                "cookie": decodeURIComponent(headers.cookie),
                "Referer": `https://instanavigation.com/profile/${userName}`,
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"userName\":\"${userName}\"}`,
            "method": "POST"
        });

        var statusCode = apiResult.status
        if (statusCode === 200) {

            const jsonResponse = await apiResult.json()
            try {
                if (apiResult !== null) {
                    var profileEntity = new ProfileEntity(
                        jsonResponse.accountInfo.id,
                        jsonResponse.accountInfo.username,
                        jsonResponse.accountInfo.fullName,
                        jsonResponse.accountInfo.isPrivate,
                        jsonResponse.accountInfo.profilePicUrl,
                        false,
                        jsonResponse.accountInfo.followsCount,
                        jsonResponse.accountInfo.followedByCount,
                        jsonResponse.accountInfo.biography,
                        '',
                    )
                    return new ResultResponse(statusCode, profileEntity)
                } else {
                    return new ErrorModel(404, "User not found")
                }
            } catch (e) {
                console.log(TAG, e)
                return new ErrorModel(500, "Something went wrong. Error : " + e)
            }
        } else {
            console.log(TAG, "Error:", await result.text())
            return new ErrorModel(statusCode, "User not found")
        }
    } catch (error) {
        throw new ErrorModel(440, "Session Expire!!")
    }

}

export default NoLoginProfileApi