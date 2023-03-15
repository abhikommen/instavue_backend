import ErrorModel from '../../model/error.js'
import ResultResponse from '../../model/resultresponse.js'
import { GetProfile } from '../profile/profileapi.js'


const NoLoginSearchApi = async (userName, headers) => {

    try {

        var jsonArray = []

        var profileEntity = await GetProfile(0, userName, headers)
        if(profileEntity.code === 200){
            jsonArray.push(profileEntity.result)
        }
            
        return new ResultResponse(200, jsonArray)

    } catch (error) {
        return new ErrorModel(404, "Something went wrong : " + error)
    }

}


export default NoLoginSearchApi