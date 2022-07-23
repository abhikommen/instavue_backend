import fetch from 'node-fetch';

async function getProfile(userName) {
    var result = await fetch(`https://storiesig.info/api/ig/profile/${userName}`, {
        "headers": {
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-token": "null",
            "Referer": "https://storiesig.info/en/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    try{
        var json = await result.json()
        return json
    } catch(error){
        return {
            "error": {
              "code": 404,
              "message": "Username not found"
            }
          }
    } 
}


const storiesDao = {
    getProfile: getProfile
}

export default storiesDao