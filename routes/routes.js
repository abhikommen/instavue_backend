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
    var result = await storiesDao.searchProfile(userName, req.headers)
    res.status(result.code).send(result)
})

router.get('/profile/:userId/', async (req, res) => {
    var userId = req.params.userId
    var result = await storiesDao.getProfile(userId, req.headers )
    res.status(result.code).send(result)
})


router.get('/stories/:userid/:username', async (req, res) => {
    var userId = req.params.userid
    var userName = req.params.username
    var result = await storiesDao.getStories(userId, userName, req.headers)
    res.status(result.code).send(result)
})


router.get('/highlights/:userid', async (req, res) => {
    var userId = req.params.userid
    var result = await storiesDao.getHighlight(userId, req.headers)
    res.status(result.code).send(result)
})

router.get('/timeline/:userid/:username', async (req, res) => {
    var userId = req.params.userid
    var userName = req.params.username
    var result = await storiesDao.getTimeline(userId, userName, req.headers)
    res.status(result.code).send(result)
})

router.get('/tray', async (req, res) => {
    console.log("Called")
    var result = await storiesDao.getTray(req.headers)
    res.status(result.code).send(result)
})

router.get('/reels', async (req, res) => {
    var result = await storiesDao.getReels(req.query.reel_ids, req.headers)
    res.status(result.code).send(result)
})

router.get('/login', async (req, res) => {
    var result = await storiesDao.login(req.headers)
    res.status(result.code).send(result)
})

router.get('/sso', async (req, res) => {
    var result = await storiesDao.sso(req.headers)
    res.status(result.code).send(result)
})

router.get('/privacy', (req, res) => {
    res.sendFile(path.resolve('./assets/privacy.html'))
})

router.get('/terms_and_conditions', (req, res) => {
    res.sendFile(path.resolve('./assets/terms.html'))
})


export default router
