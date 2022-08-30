import { CheckSession } from '../../util/util.js'
import ProfileEntity from '../model/profilemodel.js'
import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';

export async function LoginApi(headers) {


    try {
        if (headers.cookie === undefined || headers.appid === undefined) {
            throw new ErrorModel(440, "Cookie or appid not present in the header request")
        }


        let result = await fetch(`https://www.instagram.com/`, {
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

            try {
                let html = await result.text()
                let userName = html.match(/username.....(.*?)\\"/)[1]
                let fullName = html.match(/full_name.....(.*?)\\/)[1]
                let id = html.match(/"id\\":\\"(.*?)\\/)[1]
                let bio = html.match(/"biography\\":\\"(.*?)\\/)[1]

                let encodedPfp = String(html.match(/profile_pic_url_hd.....(.*?)\\"/)[1])
                let pfp = encodedPfp.replaceAll('\\/', "/").replaceAll("\\\\u0026", '&').toString()
                let nonceApi = html.match(/<link.rel="preload".href="(.*?)".as="script"/g)[1]

                let url = nonceApi.match(/href="([^"]*)/)[1];

                let nonceResult = await fetch(url)
                let nonceResponse = await nonceResult.text()
                let queryHash = nonceResponse.match(/;var.h="(.*?)",i=d/)[1]

                let profileEntity = {
                    id: id,
                    username: userName,
                    full_name: fullName,
                    bio: bio,
                    pfp: pfp,
                    query_hash: queryHash
                }

                return new ResultResponse(code, profileEntity)
            } catch (e) {
                throw new ErrorModel(440, "Something went wrong parsing login response")
            }
        } else {
            return new ErrorModel(440, "Session Expire!!")
        }
    } catch (error) {
        console.log(error)
        return error
    }

}