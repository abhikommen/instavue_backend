import express from 'express'
import router from './routes/routes.js'

const app = express()
app.use('/api', router)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Running app listening`)
})
