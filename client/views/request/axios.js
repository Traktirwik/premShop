const reqUrl = 'http://165.227.165.255'
// const reqUrl = 'http://localhost:3000'

export const getToken =  async (path, data) => {
    const config = {
        method: 'post',
        url: `${reqUrl}${path}`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
    }
    return await axios(config)
}

export const reqNotAuthGet = async(path) => {
    const config = {
        method: 'get',
        url: `${reqUrl}${path}`,
        headers: { 
            'Accept': '*/*',
        },
    }
    return await axios(config)
}

export const reqAuthGet = async (path, token) => {
    const config = {
        method: 'get',
        url: `${reqUrl}${path}`,
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
        url: `${reqUrl}${path}`,
        headers: { 
            'Accept': '*/*',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
    }
    return await axios(config)
}

export const reqAuthPut = async (path, token, data) => {
    const config = {
        method: 'put',
        url: `${reqUrl}${path}`,
        headers: { 
            'Accept': '*/*',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
    }
    return await axios(config)
}

export const reqAuthDelete = async(path, token) => {
    const config = {
        method: 'delete',
        url: `${reqUrl}${path}`,
        headers: { 
            'Accept': '*/*',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    }
    return await axios(config)
}





