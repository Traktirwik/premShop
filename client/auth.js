// import {getToken} from "./views/request/axios.js"

// const butt = document.getElementById("ignat")


// butt.onclick =async function() {
//     const email = document.getElementById("email")
//     const password = document.getElementById("password")
//     const data = JSON.stringify({
//         "email": email.value,
//         "password": password.value
//       });
//     const response = await getToken('/signIn', data)
    
//     if(response.data.success == true) {
//         localStorage.setItem("token", JSON.stringify(response.data.token))
//     } 
//     if(localStorage.token) {
//         window.location.href = "/"
//     }     
// }



import Controller from "./client_controller/client.auth.controller.js"

export const body = document.getElementsByTagName("body")
export const root = document.getElementById("root")


function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    console.log(location.hash)
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
    handleHash()
    
})