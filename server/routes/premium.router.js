import { Router } from "express";
import CommonController from "../controllers/common.controller.js";
import Items from "../models/items.model.js";
import Premium from "../models/premium.model.js"
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"

const premRouter = new Router()
const itemController = new CommonController(Items)
const premiumController = new CommonController(Premium)


premRouter.get("/premium", (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})
premRouter.get("/premiumPage", (req, res) => premiumController.getAll(req, res))
premRouter.post("/premium", (req, res) => itemController.create(req, res))
premRouter.put("/premium/:id", roleMdw(["ADMIN"]), (req, res) => itemController.updateById(req, res))
premRouter.delete("/premium/:id", roleMdw(["ADMIN"]), (req, res) => itemController.deleteById(req, res))

export default premRouter;