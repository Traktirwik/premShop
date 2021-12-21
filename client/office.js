import {reqAuthGet} from "./views/request/axios.js"
import Controller from "./client_controller/office.controller.js"


document.addEventListener("DOMContentLoaded", async () => {
    if(sessionStorage.usersConfig == 'true') {
        console.log("HERE")
        window.location.href = '#'
        setTimeout(() => {
            window.location.href = '#usersConfig'
        }, 100)
    }
    

    const dynamic = await reqAuthGet(`/user/${localStorage.id}`, localStorage.token)
    const mainOffice = document.getElementById("mainOffice")
    mainOffice.insertAdjacentHTML("beforeend", 
    `
    <div id="photo" style="width: 100px; height: 100px; border: 2px solid black"></div>
    <div id ="mainInfo">
        <span id="username">Имя пользователя: ${dynamic.data.username}</span>
        <span id="email">E-mail: ${dynamic.data.email}</span>
        <span id="roles">Роль: ${dynamic.data.role.role}</span>
        <span id="favorite">Количество товаров в избранном: ${dynamic.data.favorite.id.length}</span>
        <span id="cart">Количество товаров в корзине: ${dynamic.data.cart.id.length}</span>
    </div>
    `
    )
    if(localStorage.role.includes("ADMIN")) {
        mainOffice.insertAdjacentHTML("beforeend", 
        `
        <button id="usersControl" type="buton">Управление пользователями</button>
        `
        )
    }
    
    const usersControl = document.getElementById("usersControl")
    usersControl.onclick = () => {
        window.location.href = "#usersConfig"
    }
    const office = document.getElementById("office")
    office.onclick = () => {
        sessionStorage.usersConfig = false
        window.location.href = "/office"
    }
    const to_main = document.getElementById("to_main")
    to_main.onclick = () => {
        sessionStorage.usersConfig = false
        window.location.href = "/"
    }
    const log_out = document.getElementById("log_out")
    log_out.onclick = () => {
        sessionStorage.usersConfig = false
        localStorage.id = ''
        localStorage.token = ''
        localStorage.role = ''
        window.location.href = "/auth"

    }

    function getRouteInfo() {
        const hash = location.hash ? location.hash.slice(1) : '';
        const name = hash
        return  name 
    }
    function handleHash() {
        const name = getRouteInfo()
        console.log(name)

        if(name) {
            const routeName = name
            Controller[routeName]();
    
        }
    }
    
    window.addEventListener('hashchange', () => {
        console.log("WORK")
        handleHash()
        
    })


})