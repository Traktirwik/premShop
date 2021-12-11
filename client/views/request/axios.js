
export const getToken = async (path, data) => {
    const config = {
        method: 'post',
        url: `http://localhost:3000${path}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    return await axios(config)
}

export const reqAuthGet = async (path, token) => {
    const config = {
        method: 'get',
        url: `http://localhost:3000${path}`,
        headers: {
            'Accept': '*/*',
            'Authorization': token
        },
    }
    return await axios(config)
}

export const reqAuthPost = async (path, token, data) => {
    const config = {
        method: 'post',
        url: `http://localhost:3000${path}`,
        headers: {
            'Accept': '*/*',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
    }
    return await axios(config)
}





