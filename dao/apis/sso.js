import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';

export async function SSOApi(headers) {
    try {
        if (headers.cookie === undefined) {
            throw new ErrorModel(401, "Coo not preset.")
        }
        
        let result = await fetch("https://www.instagram.com/api/v1/web/fxcal/ig_sso_users/", {
            "headers": headers,
            "body": null,
            "method": "POST"
        });

        var code = result.status
        if (code === 200) {
            try {
                let json = await result.json()
                return new ResultResponse(code, json)
            } catch (e) {
                throw new ErrorModel(440, "Login Failed : " + e)
            }
        } else {
            return new ErrorModel(440, "Session Expire!!")
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
