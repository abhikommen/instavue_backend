import ErrorModel from "../dao/model/error.js";


function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


export const CheckSession = async (result) => {
  var rawText = await result.text()
  if (!isJsonString(rawText)) {
    throw new ErrorModel(440, "Session Expire!!")
  }
  return JSON.parse(rawText)
}


export default isJsonString
