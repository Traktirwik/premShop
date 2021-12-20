import express from 'express';
import authRouter from './routes/auth.router.js';
import path from 'path'
import cors from 'cors'
import config from '../config/config.js'
import itemRouter from './routes/item.router.js';
import currencyRouter from './routes/currency.router.js'
import favoriteRouter from './routes/favorite.router.js'
import cartRouter from './routes/cart.router.js';
import premRouter from './routes/premium.router.js';

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.static(config.clientPath))

app.use(authRouter)
app.use(itemRouter)
app.use(currencyRouter)
app.use(favoriteRouter)
app.use(cartRouter)
app.use(premRouter)


app.get('/', (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${(path.join(config.clientPath + "views"))}`)
})