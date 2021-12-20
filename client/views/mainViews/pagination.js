import { editItem } from "../../client_controller/admin.controller.js"
import {adminLogic} from "../../client_controller/admin.controller.js"
import {reqAuthGet} from "../request/axios.js"
import { checkFavorite, clickToFavFunction } from "../../client_controller/client.favorite.controller.js"
import { checkCart, clickToCartFunction, deleteItemFromCart , deleteAllItemsFromCart} from "../../client_controller/client.cart.controller.js"
import filters from "./filters.js"
export default async (container, res, forCart) => {
    const allObjects = res.data.length 
    const elPerPage = 15
    const count_page = Math.ceil(allObjects / elPerPage)
    const paginationDiv = document.getElementById("pagination_div")
    paginationDiv.innerHTML = ``
    for (let i=0; i < count_page; i++) {
        paginationDiv.insertAdjacentHTML("beforeend", 
        `
        <input class="pagination_button" type="button" value=${i+1}>
        `
        )
    }

    

    const pagination_button = document.querySelectorAll(".pagination_button")
    container.innerHTML = ``
    for(let i=0; i < elPerPage; i++) {
        
        let elem = res.data[i]
        if(elem == undefined) {
            break
        } 

        container.insertAdjacentHTML("beforeend",
            `<div class="item" style="background-image: url(${elem.image.image.big_icon}); background-repeat: no-repeat;  background-size: 100%" id="${elem.id}">
            <h2 class="item_title">${elem.name}</h2>
            <span class=nation>${elem.nation}</span>
            <span class=premium style="display: none">${elem.premium}</span>
            <span class=tier>${elem.tier}</span>
            <span class=type>${elem.type}</span>
            <span class=description>${elem.description}</span>
            <span class=price>${elem.price}</span>
            ${await checkFavorite(elem.ItemId || elem.id)}
            ${await checkCart(elem.ItemId || elem.id)}
            ${forCart ? forCart() : ''}
            </div>
            <button class="edit" style="display: none"type="button">edit</button>
            <button class="save" style="display: none" type="button">save</button>
            <button class="delete" style="display: none" type="button">delete</button>
            `)
          

    }

    await adminLogic()
    await clickToFavFunction()
    await clickToCartFunction()
    await deleteItemFromCart()

    // await deleteAllItemsFromCart()

    

    pagination_button.forEach(item => {
        item.onclick = async () => {
            container.innerHTML = ``
           
            if(item.value == 1) {
                for(let i=0; i < elPerPage; i++) {
                    let elem = res.data[i]
                    container.insertAdjacentHTML("beforeend",
                        `<div class="item" style="background-image: url(${elem.image.image.big_icon}); background-repeat: no-repeat;  background-size: 100%" id="${elem.id}">
                        <h2 class="item_title">${elem.name}</h2>
                        <span class=nation>${elem.nation}</span>
                        <span class=premium style="display: none">${elem.premium}</span>
                        <span class=tier>${elem.tier}</span>
                        <span class=type>${elem.type}</span>
                        <span class=description>${elem.description}</span>
                        <span class=price>${elem.price}</span>
                        ${await checkFavorite(elem.ItemId || elem.id)}
                        ${await checkCart(elem.ItemId || elem.id)}
                        ${forCart ? forCart() : ''}
                        </div>
                        <button class="edit" style="display: none"type="button">edit</button>
                        <button class="save" style="display: none" type="button">save</button>
                        <button class="delete" style="display: none" type="button">delete</button>
                        `)
                }
                adminLogic()
                await clickToFavFunction()
                await clickToCartFunction()
                await deleteItemFromCart()
                // await deleteAllItemsFromCart()



            } else { 
                const slicedArr = res.data.slice((item.value-1)*(elPerPage))
                console.log((item.value-1)*(elPerPage-1))
                for(let i=0; i < elPerPage; i++) {
                    
                    const elem = slicedArr[i]
                    if(elem === undefined) {
                        break
                    }
                    container.insertAdjacentHTML("beforeend",
                        `<div class="item" style="background-image: url(${elem.image.image.big_icon}); background-repeat: no-repeat;  background-size: 100%" id="${elem.id}">
                        <h2 class="item_title">${elem.name}</h2>
                        <span class=nation>${elem.nation}</span>
                        <span class=premium style="display: none">${elem.premium}</span>
                        <span class=tier>${elem.tier}</span>
                        <span class=type>${elem.type}</span>
                        <span class=description>${elem.description}</span>
                        <span class=price>${elem.price}</span>
                        ${await checkFavorite(elem.ItemId || elem.id)}
                        ${await checkCart(elem.ItemId || elem.id)}
                        ${forCart ? forCart() : ''}
                        </div>
                        <button class="edit" style="display: none"type="button">edit</button>
                        <button class="save" style="display: none" type="button">save</button>
                        <button class="delete" style="display: none" type="button">delete</button>
                        `)
                    adminLogic()
                    await clickToFavFunction()
                    await clickToCartFunction()
                    await deleteItemFromCart()
                    // await deleteAllItemsFromCart()



                }
            }
            
        }
    })
}