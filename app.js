import express from 'express'
import router from './routes/routes.js'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router)

app.listen(3000, () => {
    console.log(`Running app listening `, 8000)
})
