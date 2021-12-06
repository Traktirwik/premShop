import express from 'express';
import router from './routes/authRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())


// app.use(express.static(path.join(__dirname + "/clientAuth")))

app.use('/auth', router)

app.get('/', (req, res) => {
    res.send('hello sasha')
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})