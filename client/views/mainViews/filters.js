import {reqAuthGet} from "../request/axios.js"
import pagination from "./pagination.js"


export default async (container) => {
    let mySet = new Set()

    const res = await reqAuthGet("/items", localStorage.token)
    const filtersDiv = document.getElementById("qwe")
    const filtersElement = document.getElementById("filters")
        switch(filtersElement.value) {
            case "all":
                container.innerHTML = ``
                filtersDiv.innerHTML = ``
                pagination(container, res)
                
                
                break;

            case "tier":
                filtersDiv.innerHTML = ``
                filtersDiv.insertAdjacentHTML("beforeend", 
                `
                <input type="checkbox" class="tiers" name="1" value="1">
                <label for="1">1</label>
                <input type="checkbox" class="tiers" name="2" value="2">
                <label for="2">2</label>
                <input type="checkbox" class="tiers" name="3" value="3">
                <label for="3">3</label>
                <input type="checkbox" class="tiers" name="4" value="4">
                <label for="4">4</label>
                <input type="checkbox" class="tiers" name="5" value="5">
                <label for="5">5</label>
                <input type="checkbox" class="tiers" name="6" value="6">
                <label for="6">6</label>
                <input type="checkbox" class="tiers" name="7" value="7">
                <label for="7">7</label>
                <input type="checkbox" class="tiers" name="8" value="8">
                <label for="8">8</label>
                <input type="checkbox" class="tiers" name="9" value="9">
                <label for="9">9</label>
                <input type="checkbox" class="tiers" name="10" value="10">
                <label for="10">10</label>
                `)

                const tierFilters = document.querySelectorAll(".tiers")
                tierFilters.forEach(item => {
                    item.onchange = () => {
                        if(!item.checked) {
                           mySet.forEach(el => {
                                if(el.tier == item.value){
                                    mySet.delete(el)
                                }
                            })
                        } else {
                            res.data.forEach(elem => {
                                if(elem.tier == item.value) {
                                    mySet.add(elem)
                                }
                            })
                            container.innerHTML = ``
                        }
                        pagination(container, {data:Array.from(mySet)})
                    } 
                })
                
                break;
            
            case "nation":
                filtersDiv.innerHTML = ``
                filtersDiv.insertAdjacentHTML("beforeend", 
                `
                <input type="checkbox" class="nation" name="china" value="china">
                <label for="china">China</label>
                <input type="checkbox" class="nation" name="czech" value="czech">
                <label for="czech">czech</label>
                <input type="checkbox" class="nation" name="france" value="france">
                <label for="france">france</label>
                <input type="checkbox" class="nation" name="germany" value="germany">
                <label for="germany">germany</label>
                <input type="checkbox" class="nation" name="italy" value="italy">
                <label for="italy">italy</label>
                <input type="checkbox" class="nation" name="japan" value="japan">
                <label for="japan">japan</label>
                <input type="checkbox" class="nation" name="poland" value="poland">
                <label for="poland">poland</label>
                <input type="checkbox" class="nation" name="sweden" value="sweden">
                <label for="sweden">sweden</label>
                <input type="checkbox" class="nation" name="uk" value="uk">
                <label for="uk">uk</label>
                <input type="checkbox" class="nation" name="usa" value="usa">
                <label for="usa">usa</label>
                <input type="checkbox" class="nation" name="ussr" value="ussr">
                <label for="ussr">ussr</label>
                `
            )
            const nationFilters = document.querySelectorAll(".nation")
            nationFilters.forEach(item => {
                item.onchange = () => {
                    if(!item.checked) {
                       mySet.forEach(el => {
                            if(el.nation == item.value){
                                mySet.delete(el)
                            }
                        })
                    } else {
                        res.data.forEach(elem => {
                            if(elem.nation == item.value) {
                                mySet.add(elem)
                            }
                        })
                        container.innerHTML = ``
                    }
                    pagination(container, {data:Array.from(mySet)})
                }
            })
           
            break;
        }
}