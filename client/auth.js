import Controller from "./client_controller/client.auth.controller.js"

export const body = document.getElementsByTagName("body")
export const root = document.getElementById("root")


function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    const name = hash

    return  name 
}
function handleHash() {
    const name = getRouteInfo()

    if(name) {
        const routeName = name
        Controller[routeName]();

    }
}



document.addEventListener("DOMContentLoaded", async() => {
    if(sessionStorage.is_reloaded == 'true') {
        console.log(sessionStorage.is_reloaded)
        window.location.href = "#"
        window.location.href = "#registration"
    } else {
        window.location.href = "#"
        window.location.href = "#signIn"
    }
    
    
    
    
        
})


window.addEventListener('hashchange', () => {
    handleHash()
    
})

