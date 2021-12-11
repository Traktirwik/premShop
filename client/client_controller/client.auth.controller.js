import registration from "../views/authViews/register.js"
import login from "../views/authViews/login.js"

export default {
    async signIn() {
        login()
    },
    async registration() {
        registration()
    }
}