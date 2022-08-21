import { Router } from 'express'
import storiesDao from '../dao/storiesdao.js'
import path from "path"


const router = Router()

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/search/:userName', async (req, res) => {
    var userName = req.params.userName
    var result = await storiesDao.searchProfile(userName)
    res.send(result)
})

router.get('/profile/:userName', async (req, res) => {
    var userName = req.params.userName
    var result = await storiesDao.getProfile(userName)
    res.send(result)
})

router.get('/stories/:userid', async (req, res) => {
    var userId = req.params.userid
    var result = await storiesDao.getStories(userId)
    res.send(result)
})

router.get('/tray', async(req, res)=> {
  console.log(req.headers);
  var result = await storiesDao.getTray(req.headers)
  res.send(result)
})

router.get('/reels', async(req, res)=> {
  console.log(req.headers);
  console.log(req.query.reel_ids)
  var result = await storiesDao.getReels(req.query.reel_ids, req.headers)
  res.send(result)
})

router.get('/privacy', (req, res) => {
    res.sendFile(path.resolve('./assets/privacy.html'))
})

router.get('/terms_and_conditions', (req, res) => {
    res.sendFile(path.resolve('./assets/terms.html'))
})


export default router
