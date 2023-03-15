
import LoginSearchApi from "./login_searchapi.js";
import NoLoginSearchApi from "./nologin_searchapi.js";

export async function SearchProfile(userName, headers) {

    try {

        delete headers.host;

        let isLoggedInRequest = true
        if (headers.queryhash === undefined) {
            isLoggedInRequest = false
        }

        console.log("Search Api Called, logged in:", isLoggedInRequest, userName)

        if (isLoggedInRequest === true) {
            return await LoginSearchApi(userName, headers)
        } else {
            return await NoLoginSearchApi(userName,headers)
        }

    } catch (error) {
        return error
    }

}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
