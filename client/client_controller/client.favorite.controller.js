import {reqAuthGet, reqAuthPost} from "../views/request/axios.js"

async function checkFavorite(elemId) {
    const response = await reqAuthGet(`/favorites?id=${localStorage.id}`, localStorage.token)
    const arr = response.data.map(el => el.id)
    
    if(arr.includes(elemId)) {
        return `<input type="checkbox" class="favorites" name="id" value=${elemId} checked>`
    } else {
        return `<input type="checkbox" class="favorites" name="id" value=${elemId}>`
    }
    
}

async function clickToFavFunction() {
    const favoriteIcon = document.querySelectorAll(".favorites")

    favoriteIcon.forEach(item => {
            item.onclick = async () => {
                const data = {
                    "userId": localStorage.id,
                    "favorite": Number(item.value),
                    "location": window.location.pathname
                }
                console.log(window.location.pathname)
                const editFavorite = await reqAuthPost("/favorites", localStorage.token, data)
            }
        })
}


export {
    checkFavorite,
    clickToFavFunction
}