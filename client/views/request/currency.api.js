const access_key = 'access_key=1a717b00a6b1585e349c898377a4f97a'

async function getCurrencyList() {

    const config = {
        method: "get",
        url: `http://api.currencylayer.com/live?${access_key}`
    }
    const response = await axios(config)
    return response
    
}

export {
    getCurrencyList,
}