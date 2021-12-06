// import axios from 'axios'

const protocol = 'http://'
const domain = 'localhost:3000/'

const config = {
    "Content-Type": "application/json",
    "Accept": "*/*",
}

let userData = {
    username: "qwe",
    password: "zxc"
}

async function getToken(userData, urlPath) {
    let response = await axios({
        method: 'post',
        url: `${protocol}${domain}${urlPath}`,
        headers: config,
        data: userData
    })
    return response
}

export {
    getToken
}


