import { Router } from "express";
import FavoriteController from "../controllers/office.favorite.controller.js";
import Users from "../models/users.model.js";
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"

const favoriteRouter = new Router()
const favoriteController = new FavoriteController(Users)


favoriteRouter.get("/favorites", (req, res) => favoriteController.getAllFavorites(req, res))
favoriteRouter.get("/favorite", (req, res) => {
    res.sendFile(`${config.clientPath}main.html`)
})
favoriteRouter.post("/favorites", roleMdw(["ADMIN", "USER"]), (req, res) => favoriteController.editFavorite(req, res))

export default favoriteRouter;