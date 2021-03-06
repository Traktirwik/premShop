import { Router } from "express";
import CommonController from "../controllers/common.controller.js";
import gameCurrency from "../models/currency.model.js";
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"

const currencyRouter = new Router()
const currController = new CommonController(gameCurrency)

currencyRouter.get("/gold", (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})
currencyRouter.get("/currency", (req, res) => currController.getAll(req, res))


export default currencyRouter