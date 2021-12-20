import Items from "../models/items.model.js"
import gameCurrency from "../models/currency.model.js"
import Premium from "../models/premium.model.js"

export default class FavoriteController {
    constructor(model) {
        this.model = model
    }

    async getAllFavorites(req, res) {
        try {
            await this.model.findAll(
                {
                    where: {...req.query},
                    attributes: ['favorite']
                },
               ) .then(async (val) => {
                    try {
                        const objForRender = await Items.findAll({
                            where: {
                                id: val[0].dataValues.favorite.id
                            }
                        })
                        res.json(objForRender)
                    } catch(err) {
                        res.json(err)
                    }
               })
            
        }
        catch (err) {
            res.json(err)
        }
    }

    async editFavorite(req, res) {
        try{
            const newFavorite = req.body.favorite
            const item = await this.model.findOne({where: {id: req.body.userId}})
            let arr = {...item.favorite}
            if(arr.id.includes(newFavorite) == false) {
                arr.id.push(newFavorite)

                try {
                    const result = await this.model.update({favorite: arr}, {
                        where: {
                            id: req.body.userId
                        }
                    })
                    res.json(result)
                } catch(error) {
                    console.log(error)
                    res.json(error)
                }
                
            } else {
                const filteredArr = arr.id.filter(item => item != newFavorite)
                try {
                    const result = await this.model.update({favorite: {id: filteredArr}}, {
                        where: {
                            id: req.body.userId
                        }
                    })
                    res.json(result)
                } catch(error) {
                    console.log(error)
                    res.json(error)
                }
            }
            
        } catch(err) {
            console.log(err)
            res.json(err)
        }
    }
}