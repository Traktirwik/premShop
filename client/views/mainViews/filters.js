import {reqAuthGet} from "../request/axios.js"



export default async () => {
    const container = document.getElementById("main_items")
    const res = await reqAuthGet("/items", localStorage.token)
    const filtersDiv = document.getElementById("qwe")
    const filtersElement = document.getElementById("filters")
    let filters = []
        switch(filtersElement.value) {
            case "all":
                filters = []
                container.innerHTML = ``
                filtersDiv.innerHTML = ``
                    res.data.forEach(elem => {
                        container.insertAdjacentHTML("beforeend",
                            `<div class="item" style="background-image: url(${elem.image.image.big_icon}); background-repeat: no-repeat;  background-size: 100%" id="${elem.id}">
                            <h2 class="item_title">${elem.name}</h2>
                            <span class=nation>${elem.nation}</span>
                            <span class=premium style="display: none">${elem.premium}</span>
                            <span class=tier>${elem.tier}</span>
                            <span class=type>${elem.type}</span>
                            <span class=description>${elem.description}</span>
                            <span class=price>${elem.price}</span>
                
                            </div>
                            <button class="edit" style="display: none"type="button">edit</button>
                            <button class="save" style="display: none" type="button">save</button>
                            <button class="delete" style="display: none" type="button">delete</button>
                            `
                            )
                    });
                
                
                break;

            case "tier":
                filtersDiv.insertAdjacentHTML("beforeend", 
                `
                <select id = "tiers">
                <option value="none" selected>Выберите уровень</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
                `)

                const tierFilters = document.getElementById("tiers")
                tierFilters.onchange = () => {
                    
                    filters = []
                    const filter = res.data.filter(item => item.tier == tierFilters.value)
                    filters.push(filter)
                    // console.log(filters.flat()[0])
                    container.innerHTML = ``
                    filters.flat().forEach(elem => {
                        container.insertAdjacentHTML("beforeend",
                            `<div class="item" style="background-image: url(${elem.image.image.big_icon}); background-repeat: no-repeat;  background-size: 100%" id="${elem.id}">
                            <h2 class="item_title">${elem.name}</h2>
                            <span class=nation>${elem.nation}</span>
                            <span class=premium style="display: none">${elem.premium}</span>
                            <span class=tier>${elem.tier}</span>
                            <span class=type>${elem.type}</span>
                            <span class=description>${elem.description}</span>
                            <span class=price>${elem.price}</span>
                
                            </div>
                            <button class="edit" style="display: none"type="button">edit</button>
                            <button class="save" style="display: none" type="button">save</button>
                            <button class="delete" style="display: none" type="button">delete</button>
                            `
                        )
                    }); 
                } 
                break;
            
            case "nation":
                filtersDiv.insertAdjacentHTML("beforeend", 
                `
                <select id = "nation">
                <option value="none" selected>Выберите нацию</option>
                <option value="china">China</option>
                <option value="czech">Czech</option>
                <option value="france">France</option>
                <option value="germany">Germany</option>
                <option value="italy">Italy</option>
                <option value="japan">Japan</option>
                <option value="poland">Poland</option>
                <option value="sweden">Sweden</option>
                <option value="uk">UK</option>
                <option value="usa">USA</option>
                <option value="ussr">USSR</option>
                </select>
                `
            )
            const nationFilters = document.getElementById("nation")
            nationFilters.onchange = () => {
                filters = []
                const filter = res.data.filter(item => item.nation == nationFilters.value)
                filters.push(filter)
                container.innerHTML = ``
                filters.flat().forEach(elem => {
                    container.insertAdjacentHTML("beforeend",
                            `<div class="item" style="background-image: url(${elem.image.image.big_icon}); background-repeat: no-repeat;  background-size: 100%" id="${elem.id}">
                            <h2 class="item_title">${elem.name}</h2>
                            <span class=nation>${elem.nation}</span>
                            <span class=premium style="display: none">${elem.premium}</span>
                            <span class=tier>${elem.tier}</span>
                            <span class=type>${elem.type}</span>
                            <span class=description>${elem.description}</span>
                            <span class=price>${elem.price}</span>
                
                            </div>
                            <button class="edit" style="display: none"type="button">edit</button>
                            <button class="save" style="display: none" type="button">save</button>
                            <button class="delete" style="display: none" type="button">delete</button>
                            `
                        )
                });
                
            }
            break;
            
        }
}