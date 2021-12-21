import Items from "../models/items.model.js"
import gameCurrency from"../models/currency.model.js"
import Premium from "../models/premium.model.js"

export default class CartController {
    constructor(model) {
        this.model = model
    }

    async getAllcartObjects(req, res) {
        try {
            await this.model.findAll(
                {
                    where: {...req.query},
                    attributes: ['cart']
                },
               ) .then(async (val) => {
                    try {
                        const objForRender = await Items.findAll({
                            where: {
                                id: val[0].dataValues.cart.id
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

    async editCart(req, res) {
        try{
            const newCart = req.body.cart
            const item = await this.model.findOne({where: {id: req.body.userId}})
            let arr = {...item.cart}
            if(arr.id.includes(newCart) == false) {
                arr.id.push(newCart)

                try {
                    const result = await this.model.update({cart: arr}, {
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
                const filteredArr = arr.id.filter(item => item != newCart)
                try {
                    const result = await this.model.update({cart: {id: filteredArr}}, {
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
    async deleteAllFromCart(req, res) {
        try{
            const result = await this.model.update({cart: {id: []}}, {
                where: {
                    ...req.query
                }
            })
            res.json(result)
        } catch(error) {
            console.log(error)
            res.json(error)
        }
    }
}

