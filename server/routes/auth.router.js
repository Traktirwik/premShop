import { Router } from "express";
import authController from "../controllers/authController.js";
import roleMdw from "../middlewares/role.mdw.js";
import config from "../../config/config.js"


const authRouter = new Router()


authRouter.post('/registration', authController.registration)
authRouter.post('/auth', authController.signIn)
authRouter.put('/office/:id', roleMdw(["ADMIN"]), authController.editUserRole)
authRouter.delete('/office/:id', roleMdw(["ADMIN"]), authController.deleteUserById)
authRouter.get('/auth', (req, res) => {
    res.sendFile(`${config.clientPath}auth.html`)
})
authRouter.get('/user/:id', roleMdw(["ADMIN", "USER"]), authController.getUserOffice)
authRouter.get('/users', roleMdw(["ADMIN"]), authController.getUsers)
authRouter.get('/office', (req, res) => {
    res.sendFile(`${config.clientPath}office.html`)
})


export default authRouter