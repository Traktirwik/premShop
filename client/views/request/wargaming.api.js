import axios from 'axios'
import Items from '../../../server/models/items.model.js'
import tanks from './tanksInfo.js'
async function getVehiclesItems() {

    const config = {
        method: "get",
        url: `https://api.worldoftanks.ru/wot/encyclopedia/vehicles/?application_id=085fe2df7763bdde048e9d5ca20fef89&fields=is_wheeled%2C+is_premium%2C+images%2C+type%2C+description%2C+short_name%2C+tier%2C+nation%2C+price_credit`
    }
    const response = await axios(config)
    console.log(response.status)
    let vehiclesList = []
    let par = response.data.data
    let arr = Object.values(par)

    for(let item of arr) {
        vehiclesList.push(item)
        // console.log(item.short_name)
        if(vehiclesList.length == 550){
            break
        }
        try {
            const res = await Items.create({
                name: item.short_name,
                price: item.price_credit,
                image: { image: item.images },
                wheeled: item.is_wheeled,
                nation: item.nation,
                premium: item.is_premium,
                tier: item.tier,
                type: item.type,
                description: item.description
            });
            }
            catch (err) {
            console.log(err)
            }
    }
    // console.log(vehiclesList)
    
    

    return response
    
}

// getVehiclesItems()

async function parsePremShop() {
    let index = 0;
    console.log(tanks.length, ":::::::::::::::::")
    tanks.forEach(async(item) => {
        const currInfo = await Items.findOne({where: {name: item.name}})
        if(currInfo === null) {
            console.log(item.name, index)
            index++
        }  else {
            await Items.update(item, {where: {name: item.name}})
            console.log("updated:" , item.name)
        }
    })
}
parsePremShop()
// export {
//     getVehiclesItems,
// }