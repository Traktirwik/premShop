import { reqAuthGet, reqAuthPost, reqNotAuthGet } from "./views/request/axios.js"
import pagination from "./views/mainViews/pagination.js"
import filter from "./views/mainViews/filters.js"
import currency from "./views/mainViews/currency.js"
import itemLink from "./views/mainViews/solo.item.js"

document.addEventListener("DOMContentLoaded", async () => {
    
    // const container = document.getElementById("main_items")
    // const res = await reqAuthGet("/items", localStorage.token)

    //pagination
    await pagination()


    // filters
    const filtersElement = document.getElementById("filters")
    filtersElement.onchange = async () => {
        await filter()
    }

    // currency logic (limited requests, don't uncomment w/o reason)
    // await currency()
    
    // each shop card
    await itemLink()

})
async function postItem() {
    const name = document.getElementById("name_field").value
    const price = document.getElementById("price_field").value
    const data = { name, price: +price }
    await reqAuthPost("/items", localStorage.token, JSON.stringify(data))
    location.reload()
}
const postButton = document.getElementById("post_btn")
postButton.onclick = () => {
    // postItem()
}
const signInButton = document.getElementById("sign_in")
signInButton.onclick = () => {
    window.location.href = "/auth"
}
const logOutButton = document.getElementById("log_out")
logOutButton.onclick = () => {
    localStorage.token = ''
    localStorage.role = []
    window.location.href = "auth"
}







