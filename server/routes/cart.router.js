import { Router } from "express";
import CartController from "../controllers/office.cart.controller.js";
import Users from "../models/users.model.js";
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"


const cartRouter = new Router()
const cartController = new CartController(Users)


cartRouter.get("/cart", (req, res) => cartController.getAllcartObjects(req, res))
cartRouter.get("/cartPage", (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})
cartRouter.post("/cart", roleMdw(["ADMIN", "USER"]), (req, res) => cartController.addToCart(req, res))
cartRouter.delete("/cart", roleMdw(["ADMIN", "USER"]), (req, res) => cartController.deleteObjectFromCart(req, res))
cartRouter.delete("/allCart", roleMdw(["ADMIN", "USER"]), (req, res) => cartController.deleteAllFromCart(req, res))

export default cartRouter;