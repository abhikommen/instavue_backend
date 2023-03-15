
import { CheckSession } from '../../../util/util.js'
import ProfileEntity from '../../model/profilemodel.js'
import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import fetch from 'node-fetch';

const LoginSearchApi = async (userName, headers) => {

    try {
        let result = await fetch(`https://i.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${userName}`, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });

        var code = result.status
        console.log("Search Api Code : ", code)
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
            console.log("Search Error: Login ", await result.text(), userName)
            return new ErrorModel(code, "Session Expire!!")
        }
    } catch (error) {
        return new ErrorModel(404, "Something went wrong : " + error)
    }

}


export default LoginSearchApi