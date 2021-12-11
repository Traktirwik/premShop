import { reqAuthGet, reqAuthPost } from "./views/request/axios.js"

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("main_items")
    const res = await reqAuthGet("/items", localStorage.token)
    res.data.forEach(elem => {
        container.insertAdjacentHTML("beforeend",
            `<div class="item" id="${elem.id}">
            <h2 class="item_title">${elem.name}</h2>
            <p>${elem.price}</p>
            </div>`)
    });
    const items = document.querySelectorAll(".item")
    items.forEach(item => {
        item.addEventListener("click", () => {
            window.location.href = `/items/${item.id}`
        })
    });

})
async function postItem() {
    const name = document.getElementById("name_field").value
    const price = document.getElementById("price_field").value
    const data = { name, price: +price }
    await reqAuthPost("/items", localStorage.token, JSON.stringify(data))
}
const postButton = document.getElementById("post_btn")
postButton.onclick = () => {
    postItem()
}







