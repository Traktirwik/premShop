import { Router } from "express";
import CommonController from "../controllers/common.controller.js";
import ItemsController from "../controllers/items.controller.js";
import Items from "../models/items.model.js";
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"



const itemRouter = new Router()
const itemController = new CommonController(Items)


itemRouter.get("/items", (req, res) => itemController.getAll(req, res))
itemRouter.get("/vehicle", (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})
itemRouter.get("/vehiclesPage", (req, res) => itemController.getVehicle(req, res))
itemRouter.get("/items/:id", (req, res) => ItemsController.getHtml(req, res))
itemRouter.post("/items", (req, res) => itemController.create(req, res))
itemRouter.put("/items/:id", roleMdw(["ADMIN"]), (req, res) => itemController.updateById(req, res))
itemRouter.delete("/items/:id", roleMdw(["ADMIN"]), (req, res) => itemController.deleteById(req, res))

export default itemRouter