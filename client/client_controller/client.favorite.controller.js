import {reqAuthGet, reqAuthPost} from "../views/request/axios.js"



async function checkFavorite(elemId) {
    const response = await reqAuthGet(`/favorites?id=${localStorage.id}`, localStorage.token)
    const arr = response.data.map(el => el.id)
    if(arr.includes(elemId)) {
        return `<div class="item_favorite favorites filled" name="id" value=${elemId}></div>`
    } else {
        return `<div class="item_favorite favorites unfilled" name="id" value=${elemId}></div>`
    }
    
}


async function clickToFavFunction() {
    const favoriteIcon = document.querySelectorAll(".favorites")

    favoriteIcon.forEach(item => {
            item.onclick = async () => {
                event.stopPropagation()
                if (item.className.includes("unfilled")) {
                    item.classList.remove("unfilled")
                    item.classList.add("filled")
                }
                else if (item.className.includes("filled")) {
                    item.classList.remove("filled")
                    item.classList.add("unfilled")
                    item.classList.remove("favorite")
                }
               
                const data = {
                    "userId": localStorage.id,
                    "favorite": item.attributes.value.value,
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