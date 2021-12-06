import { authController } from "./clientRegistration.js"



export default {
    async signInRoute() {
        const response = await authController()
        console.log(response)
    }
}