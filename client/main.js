import { reqAuthGet, reqAuthPost, reqNotAuthGet } from "./views/request/axios.js"
import {editItem} from "./client_controller/admin.controller.js"


document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("main_items")
    const res = await reqAuthGet("/items", localStorage.token)
    res.data.forEach(elem => {
        container.insertAdjacentHTML("beforeend",
            `<div class="item" id="${elem.id}">
            <h2 class="item_title">${elem.name}</h2>
            <p>${elem.price}</p>
            </div>
            <button class="edit" style="display: none"type="button">edit</button>
            <button class="save" style="display: none" type="button">save</button>
            <button class="delete" style="display: none" type="button">delete</button>
            `)
    });
    const items = document.querySelectorAll(".item")
    // items.forEach(item => {
    //     item.addEventListener("click", () => {
    //         window.location.href = `/items/${item.id}`
    //     })
    // });
    if(localStorage.role.includes("ADMIN")) {
        const edit = document.querySelectorAll(".edit")
        
        edit.forEach(item => {
            item.style.display = "inherit"
            item.addEventListener("click", async () => {
                await editItem(item)
            })
        })
    }

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
    postItem()
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







