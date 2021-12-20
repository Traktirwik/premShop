import {reqAuthGet, reqAuthPost, reqAuthDelete} from "../views/request/axios.js"

async function checkCart(elemId) {
    const response = await reqAuthGet(`/cart?id=${localStorage.id}`, localStorage.token)
    const qwe = response.data.map(el => el.id)
    
    if(qwe.includes(elemId)) {
        return `<input type="checkbox" class="cart" name="id" value=${elemId} checked>`
    } else {
        return `<input type="checkbox" class="cart" name="id" value=${elemId}>`
    }
    
}

async function clickToCartFunction() {
    const cartIcon = document.querySelectorAll(".cart")

    cartIcon.forEach(item => {
            
            item.onclick = async () => {
                console.log(item.checked)
                if(!item.checked){
                    return;
                }
                const data = {
                    "userId": localStorage.id,
                    "cart": Number(item.value),
                    "location": window.location.pathname
                }
                console.log(data)
                console.log(window.location.pathname)
                await reqAuthPost("/cart", localStorage.token, data)
            }
        })
}

async function deleteItemFromCart() {
    const oneProd = document.querySelectorAll(".deleteProductFromCart")
    oneProd.forEach(item => {
        item.onclick = async () => {
            console.log(item.parentElement.id)
            const data = {
                userId: localStorage.id,
                cart: item.parentElement.id
            }
            const deleteItem = await reqAuthDelete("/cart", localStorage.token, data)
            location.reload()
        }
    })
}

async function deleteAllItemsFromCart(allProd) {
    allProd.onclick = async () => {
        console.log(localStorage.id)
        
        await reqAuthDelete(`/allCart?id=${localStorage.id}`, localStorage.token)
        location.reload()
    }
}

export {
    checkCart,
    clickToCartFunction,
    deleteItemFromCart,
    deleteAllItemsFromCart
}