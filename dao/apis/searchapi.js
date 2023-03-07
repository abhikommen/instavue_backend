import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';
import testingHeader from '../model/testingheader.js'

let retrying = 4

export async function SearchProfile(userName, headers) {

    try {

        delete headers.host;
        if (headers.cookie === undefined) {
            headers.cookie = "ds_user_id=" + getRandomArbitrary(11111, 555555)
        }

        console.log(headers)

        let result = await fetch(`https://i.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${userName}`, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });

        var code = result.status
        console.log("Search Api Code : ", code)
        if (code === 200) {
            retrying = 4
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
            if(retrying > 0){
               retrying--
               delete headers.cookie
               return await SearchProfile(userName, headers)
            } else {
                retrying = 4
                console.log("Search Error: ", await result.text())
                return new ErrorModel(440, "Session Expire!!")
            }
        }
    } catch (error) {
        return error
    }

}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
