import { Router } from 'express'
import storiesDao from '../dao/storiesdao.js'
const router = Router()

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
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


// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

export default router