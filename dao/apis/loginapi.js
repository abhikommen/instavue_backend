import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';
import { GetProfile } from './profile/profileapi.js'


const TAG = "LoginApi"
const ERRORTAG = "LoginApiError"


export async function LoginApi(headers) {
    try {
        delete headers.host;
        delete headers["user-agent"];

        console.log(TAG, headers)

        if (headers.cookie === undefined) {
            throw new ErrorModel(401, "Headers not preset.")
        }

        let result = await fetch(`https://www.instagram.com/`, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });

        var code = result.status
        console.log(code)

        if (code === 200) {
            try {
                let html = await result.text()
                let userName = html.match(/viewerId.....(.*?)\\"/)[1]
                let userid = html.match(/viewerId.....(.*?)\\"/)[1]

                console.log(TAG, userName, userid)
                let nonceApi = html.match(/<link.rel="preload".href="(.*?)".as="script"/g)
                headers.queryhash = ''
                let profile = await GetProfile(userid, userName, headers)
                profile.result.query_hash = await findNonce(nonceApi)
                console.log(TAG, "Response:", profile.result)
                return new ResultResponse(code, profile.result)
            } catch (e) {
                console.log(TAG, "Error", profile.result)
                throw new ErrorModel(440, "Login Failed : " + e)
            }
        } else {
            console.log(ERRORTAG, await result.text())
            return new ErrorModel(440, "Session Expire!!")
        }
    } catch (error) {
        console.log(ERRORTAG, error)
        return new ErrorModel(404, "Something went wrong ")
    }
}

const findNonce = async (regexLinkArray) => {
    try {
        for (let linkRegex of regexLinkArray) {
            try {
                let url = linkRegex.match(/href="([^"]*)/)[1];
                let nonceResult = await fetch(url)
                let nonceResponse = await nonceResult.text()
                try {
                    let queryHash = nonceResponse.match(/(?<=;var.h=")(.*)(?=",i=d)/g)[0]
                    return queryHash
                } catch {
                    console.log(ERRORTAG, "Couldn't find nonce url... ")
                }
            } catch (e) {
                console.log(ERRORTAG, "Error getting query hash", e)
            }
        }
    } catch (error) {
        console.log(ERRORTAG, "Error getting query hash", error)
    }
    return "na"
}