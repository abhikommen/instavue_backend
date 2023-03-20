import { CheckSession } from '../../../util/util.js'
import ProfileEntity from '../../model/profilemodel.js'
import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import fetch from 'node-fetch';
import { raw } from 'express';

const TAG = "ProfileApiTag"

const LoginProfileApi = async (userId, headers) => {

    try {
        delete headers.host;
        console.log('LoginProfileApi')
        let result = await fetch(`https://i.instagram.com/api/v1/users/${userId}/info`, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });

        let code = result.status
        console.log(TAG, "Status Code:", code)
        if (code === 200) {
            var rawJson = await CheckSession(result)
            console.log("Profile Response", rawJson)
            try {
                let user = rawJson.user
                if (user !== null) {

                    let profilePicture = ''

                    if ('hd_profile_pic_versions' in user) {
                        profilePicture = user.hd_profile_pic_versions[user.hd_profile_pic_versions.length - 1].url
                    }

                    if ('hd_profile_pic_url_info' in user) {
                        profilePicture = user.hd_profile_pic_url_info.url
                    }

                    var profileEntity = new ProfileEntity(
                        user.pk,
                        user.username,
                        user.full_name,
                        user.is_private,
                        profilePicture,
                        user.is_verified,
                        user.follower_count,
                        user.following_count,
                        user.biography,
                        '',
                    )
                    return new ResultResponse(code, profileEntity)
                } else {
                    return new ErrorModel(404, "User not found")
                }
            } catch (e) {
                console.log(TAG, e)
                return new ErrorModel(500, "Something went wrong. Error : " + e)
            }
        } else {
            console.log(TAG, "Error:", await result.text())
            return new ErrorModel(code, "User not found")
        }
    } catch (error) {
        console.log(TAG, "Exception:", error)
        return new ErrorModel(404, error)
    }

}

export default LoginProfileApi