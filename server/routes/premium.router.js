import { Router } from "express";
import CommonController from "../controllers/common.controller.js";
import Premium from "../models/premium.model.js"
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"

const premRouter = new Router()
const premiumController = new CommonController(Premium)


premRouter.get("/premium", (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})
premRouter.get("/premiumPage", (req, res) => premiumController.getAll(req, res))

export default premRouter;