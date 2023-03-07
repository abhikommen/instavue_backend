import ErrorModel from '../model/error.js'
import ResultResponse from '../model/resultresponse.js'
import fetch from 'node-fetch';
import { GetProfile } from './profileapi.js'
import fs from 'fs'

export async function LoginApi(headers) {
    try {
        delete headers.host;
        delete headers["user-agent"];
    
        console.log(headers)
        if (headers.cookie === undefined ) {
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
                let userName = html.match(/username.....(.*?)\\"/)[1]
                let userid = html.match(/viewerId.....(.*?)\\"/)[1]
                console.log(userName)

                let nonceApi = html.match(/<link.rel="preload".href="(.*?)".as="script"/g)
                let profile = await GetProfile(userid, userName, headers)
                profile.result.query_hash = await findNonce(nonceApi)
                console.log(profile.result)
                return new ResultResponse(code, profile.result)
            } catch (e) {
                throw new ErrorModel(440, "Login Failed : " + e)
            }
        } else {
            console.log(await result.text())
            return new ErrorModel(440, "Session Expire!!")
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

const findNonce = async (regexLinkArray) => {
    try {
        for (let linkRegex of regexLinkArray) {
            try{
                let url = linkRegex.match(/href="([^"]*)/)[1];
                let nonceResult = await fetch(url)
                let nonceResponse = await nonceResult.text()
                try {
                    let queryHash = nonceResponse.match(/(?<=;var.h=")(.*)(?=",i=d)/g)[0]
                    return queryHash
                } catch {
                    console.log("Couldn't find url... ")
                }
            } catch (e){

            }
        }
    } catch(error){
        //return "na"
    }
    return "na"
}