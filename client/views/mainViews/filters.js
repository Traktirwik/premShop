import {reqAuthGet} from "../request/axios.js"
import pagination from "./pagination.js"


export default async (container, res) => {
    const filtersDiv = document.getElementById("qwe")
    const filtersElement = document.getElementById("filters")
    if(window.location.pathname === "/vehicle") {
        const vehicleFilters = document.querySelectorAll(".vehicle, .generalPrem")
        vehicleFilters.forEach(item => item.style.display = "inherit")
    }
    if(window.location.pathname === "/gold") {
        console.log("ERE")
        const goldFilters = document.querySelectorAll(".generalPrem")
        goldFilters.forEach(item => item.style.display = "inherit")
    }
    if(window.location.pathname === "/premium") {
        const vehicleFilters = document.querySelectorAll(".allFilters")
        vehicleFilters.forEach(item => item.style.display = "inherit")
    }
    if(window.location.pathname === "/") {
        const allFilters = document.querySelectorAll(".allFilters, .generalPrem")
        allFilters.forEach(item => item.style.display = "inherit")
    }
    

    filtersElement.onchange = () => {

    
        switch(filtersElement.value) {
            case "all":
                container.innerHTML = ``
                filtersDiv.innerHTML = ``
                pagination(container, res)
                
                
                break;

            case "tier":
                let tierSet = new Set()

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
                            tierSet.forEach(el => {
                                if(el.tier == item.value){
                                    tierSet.delete(el)
                                }
                            })
                        } else {
                            res.data.forEach(elem => {
                                if(elem.tier == item.value) {
                                    tierSet.add(elem)
                                }
                            })
                            container.innerHTML = ``
                        }
                        pagination(container, {data:Array.from(tierSet)})
                    } 
                })
                
                break;
            
            case "nation":
                let nationSet = new Set()
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
                        nationSet.forEach(el => {
                            if(el.nation == item.value){
                                nationSet.delete(el)
                            }
                        })
                    } else {
                        res.data.forEach(elem => {
                            if(elem.nation == item.value) {
                                nationSet.add(elem)
                            }
                        })
                        container.innerHTML = ``
                    }
                    pagination(container, {data:Array.from(nationSet)})
                }
            })
           
            break;

        case "type" :
            let typeSet = new Set()
            filtersDiv.innerHTML = ``
            filtersDiv.insertAdjacentHTML("beforeend", 
            `
            <input type="checkbox" class="vehicleType" name="SPG" value="SPG">
            <label for="SPG">SPG</label>
            <input type="checkbox" class="vehicleType" name="mediumTank" value="mediumTank">
            <label for="mediumTank">Medium Tank</label>
            <input type="checkbox" class="vehicleType" name="lightTank" value="lightTank">
            <label for="lightTank">Light Tank</label>
            <input type="checkbox" class="vehicleType" name="heavyTank" value="heavyTank">
            <label for="heavyTank">Heavy Tank</label>
            <input type="checkbox" class="vehicleType" name="AT-SPG" value="AT-SPG">
            <label for="AT-SPG">AT-SPG</label>
            `
            )
            const vehicleTypeFilter = document.querySelectorAll(".vehicleType")
            vehicleTypeFilter.forEach(item => {
                item.onchange = () => {
                    if(!item.checked) {
                        typeSet.forEach(el => {
                            if(el.type == item.value){
                                typeSet.delete(el)
                            }
                        })
                    } else {
                        res.data.forEach(elem => {
                            if(elem.type == item.value) {
                                typeSet.add(elem)
                            }
                        })
                        container.innerHTML = ``
                    }
                    pagination(container, {data:Array.from(typeSet)})
                }
            })
            break;

        case "premium" :
            let premiumSet = new Set()
            filtersDiv.innerHTML = ``
            filtersDiv.insertAdjacentHTML("beforeend", 
            `
            <input type="checkbox" class="genPrem" name="true" value="true">
            <label for="true">Да</label>
            <input type="checkbox" class="genPrem" name="false" value="false">
            <label for="false">Нет</label>
            `
            )
            const generalPremFilter = document.querySelectorAll(".genPrem")
            generalPremFilter.forEach(item => {
                item.onchange = () => {
                    if(!item.checked) {
                        premiumSet.forEach(el => {
                            if(String(el.premium) == item.value){
                                premiumSet.delete(el)
                            }
                        })
                    } else {
                        res.data.forEach(elem => {
                            if(String(elem.premium) == item.value) {
                                premiumSet.add(elem)
                            }
                        })
                        container.innerHTML = ``
                    }
                    pagination(container, {data:Array.from(premiumSet)})
                }
            })
            break;

        case "allType" :
            let allTypeSet = new Set()
            filtersDiv.innerHTML = ``
            filtersDiv.insertAdjacentHTML("beforeend", 
            `
            <input type="checkbox" class="allTypesBoxes" name="vehicle" value=${["SPG", "lightTank", "mediumTank", "heavyTank", "AT-SPG"]}>
            <label for="vehicle">Техника</label>
            <input type="checkbox" class="allTypesBoxes" name="gold" value="gold">
            <label for="gold">Gold</label>
            `
            )
            const allTypesBoxes = document.querySelectorAll(".allTypesBoxes")
            allTypesBoxes.forEach(item => {
                item.onchange = () => {
                    if(!item.checked) {
                        allTypeSet.forEach(el => {
                            if(item.value.includes(el.type)){
                                allTypeSet.delete(el)
                            }
                        })
                    } else {
                        res.data.forEach(elem => {
                           
                            if(item.value.includes(elem.type)) {
                                console.log(elem.type)
                                allTypeSet.add(elem)
                            }
                        })
                        container.innerHTML = ``
                    }
                    pagination(container, {data:Array.from(allTypeSet)})
                }
            })
        }

    }
}