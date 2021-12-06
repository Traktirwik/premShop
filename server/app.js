import express from 'express';
import router from './routes/auth.router.js';
import path from 'path'
import cors from 'cors'
import config from '../config/config.js'


console.log(path)
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use('/auth', router)



app.get('/', (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})

app.get('/auth/signIn', (req, res) => {
    res.sendFile(`${config.clientPath}auth.html`)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${config.clientPath}`)
})