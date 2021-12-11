import express from 'express';
import authRouter from './routes/auth.router.js';
import path from 'path'
import cors from 'cors'
import config from '../config/config.js'
import itemRouter from './routes/item.router.js';


console.log(path)
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.static(config.clientPath))

app.use(authRouter)
app.use(itemRouter)


console.log(config.test)
app.get('/', (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${(path.join(config.clientPath + "views"))}`)
})