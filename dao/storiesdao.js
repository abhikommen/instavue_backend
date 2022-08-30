import fetch from 'node-fetch';

import ProfileEntity from './model/profilemodel.js'
import ErrorModel from './model/error.js'
import ResultResponse from './model/resultresponse.js'
import isJsonString from '../util/util.js'
import {TrayApi} from './apis/trayapi.js'
import {GetStories} from './apis/storiesapi.js'
import {GetProfile} from './apis/profileapi.js'
import {SearchProfile} from './apis/searchapi.js'
import {GetReels}  from './apis/reelsapi.js'
import {LoginApi}  from './apis/loginapi.js'


const storiesDao = {
  searchProfile: SearchProfile,
  getProfile: GetProfile,
  getStories: GetStories,
  getTray: TrayApi,
  getReels: GetReels,
  login : LoginApi,
}



export default storiesDao
