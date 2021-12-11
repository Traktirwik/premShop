import { Router } from "express";
import CommonController from "../controllers/common.controller.js";
import ItemsController from "../controllers/items.controller.js";
import Items from "../models/items.model.js";


const itemRouter = new Router()
const itemController = new CommonController(Items)


itemRouter.get("/items", (req, res) => itemController.getAll(req, res))
itemRouter.get("/items/:id", (req, res) => ItemsController.getHtml(req, res))
itemRouter.post("/items", (req, res) => itemController.create(req, res))
itemRouter.put("/items/:id", (req, res) => itemController.updateById(req, res))
itemRouter.get("/items/:id", (req, res) => itemController.deleteById(req, res))

export default itemRouter