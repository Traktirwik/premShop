import {root} from '../../auth.js'
import { getToken } from '../request/axios.js'


const registration = () => {
    sessionStorage.setItem("is_reloaded", true);

    root.innerHTML = `
    <div class="auth_wrapper">
        <span id="registration_title" class="auth_title">РЕГИСТРАЦИЯ В PREMIUM SHOP</span>
        <input id="email" class="auth_input" type="text" placeholder="E-mail">
        <input class="auth_input"  type="text" placeholder="Имя">
        <input id="password" class="auth_input" type="text" placeholder="Пароль">
        <input class="auth_input" type="text" placeholder="Повторите пароль">
        <div class="checkBox">
            <input type="checkbox" class="termsBox">
            <label for="termsBox"">Я принимаю Пользовательское соглашение</label>
        </div>
        <button id="butt" type="button">ПРОДОЛЖИТЬ >></button>
        <span id = "backToSignIn" class="link_field">Уже зарегестрированы? Войдите</span>
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

    const signInButton = document.getElementById("backToSignIn")
    signInButton.onclick = () => {
        window.location.href = "#signIn"
    }


}

export default registration