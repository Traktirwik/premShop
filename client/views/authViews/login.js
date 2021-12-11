import {root} from '../../auth.js'
import {getToken} from "../request/axios.js"

const login = () => {
    root.innerHTML = `
    <div>
        <span>Sign In</span>
        <span>Email</span>
        <input id="email" type="text">
        <span>Password</span>
        <input id="password" type="text">
        <button id="butt" type="button">sign In</button>
    </div>
    `

    const butt = document.getElementById("butt")


    butt.onclick = async function() {
        const email = document.getElementById("email")
        const password = document.getElementById("password")
        const data = JSON.stringify({
            "email": email.value,
            "password": password.value
        });
        const response = await getToken('/auth', data)
        
        if(response.data.success == true) {
            localStorage.setItem("token", JSON.stringify(response.data.token))
        } 
        if(localStorage.token) {
            window.location.href = "/"
        }     
    }
}

export default login