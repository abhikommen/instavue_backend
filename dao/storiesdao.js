import fetch from 'node-fetch';

import ProfileEntity from './model/profilemodel.js'
import ErrorModel from './model/error.js'
import ResultResponse from './model/resultresponse.js'
import isJsonString from '../util/util.js'
import {TrayApi} from './apis/trayapi.js'
import {GetStories} from './apis/story/storiesapi.js'
import {GetProfile} from './apis/profile/profileapi.js'
import {SearchProfile} from './apis/search/searchapi.js'
import {GetReels}  from './apis/reelsapi.js'
import {LoginApi}  from './apis/loginapi.js'
import {GetHighlightList} from './apis/highlightlist/highlightapi.js'
import { GetTimeline } from './apis/timelineapi.js';
import {SSOApi} from "./apis/sso.js"


const storiesDao = {
  searchProfile: SearchProfile,
  getProfile: GetProfile,
  getStories: GetStories,
  getTray: TrayApi,
  getReels: GetReels,
  login : LoginApi,
  getHighlight : GetHighlightList,
  getTimeline : GetTimeline,
  sso : SSOApi
}

export default storiesDao
