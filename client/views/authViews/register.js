import {root} from '../../auth.js'
import { getToken } from '../request/axios.js'


const registration = () => {
    
    root.innerHTML = `
    <div>
        <span>registration</span>
        <span>Email</span>
        <input id="email" type="text">
        <span>Password</span>
        <input id="password" type="text">
        <span>Repeat password</span>
        <input type="text">
        <button id="butt" type="button">Registration</button>
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
        const response = await getToken('/registration', data)
        
        if(response.data.success == true) {
            window.location.href = "/auth#signIn"
        } 
    }


}

export default registration