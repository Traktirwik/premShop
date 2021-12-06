import { getToken } from "../requests/requests.js"


const button = document.getElementById("butt")


async function authController() {
    const username = document.getElementById('registrEmail')
    const password = document.getElementById('registrPassword')

    const userData = {
        email: username.value,
        password: password.value
    }

    let response;
    try {
        response = await getToken(userData, 'auth/signIn')
        if(response.data.success == true) {
            window.location.href = '#main'
        }
    } catch (error) {
        response = null
        console.log(error)
    }  

    return response;
}

button.addEventListener('click', authController)

export {
    authController
}