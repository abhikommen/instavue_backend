import express from 'express'
import router from './routes/routes.js'
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router)

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    console.log(env)
    app.listen(8000, () => {
        console.log(`Running app listening `, 8000)
    })
}

export default app
