import {getToken} from "./views/request/axios.js"

let butt = document.getElementById("ignat")


butt.onclick =async function() {
    const data = JSON.stringify({
        "email": "admin",
        "password": "admin777"
      });
    let response = await getToken('/signIn', data)
    
    if(response.data.success == true) {
        localStorage.setItem("token", JSON.stringify(response.data.token))
    } 
    if(localStorage.token) {
        window.location.href = "/"

    }

    
      
}