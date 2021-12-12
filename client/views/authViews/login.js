import {root} from '../../auth.js'
import {getToken} from "../request/axios.js"

const login = () => {
    sessionStorage.setItem("is_reloaded", false);

    root.innerHTML = `
    <div class="auth_wrapper">
        <span id="sign_in" class="auth_title">ВХОД В PREMIUM SHOP</span>
        <input id="email" class="auth_input" type="text" placeholder="E-mail или имя">
        <input id="password" class="auth_input" type="text" placeholder="Пароль">
        <div class="checkBox">
            <input type="checkbox" class="termsBox">
            <label for="termsBox"">Я принимаю Пользовательское соглашение</label>
        </div>
        <button id="butt" type="button">ВОЙТИ</button>
        <span id="registration" class="link_field">Нет аккаунта? Зарегистрируйтесь</span>
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
            localStorage.setItem("role", JSON.stringify(response.data.role.role))
        } 
        if(localStorage.token) {
            window.location.href = "/"
        }     
    }
    const registrationButt = document.getElementById("registration")
    registrationButt.onclick = () => {
        window.location.href = "#registration"
    }
}

export default login