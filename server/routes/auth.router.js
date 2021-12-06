import { Router } from "express";
import authController from "../controllers/authController.js";
import roleMdw from "../middlewares/role.mdw.js";


const router = new Router()


router.post('/registration', authController.registration)
router.post('/signIn', authController.signIn)
router.get('/users', roleMdw(["ADMIN"]), authController.getUsers)


export default router