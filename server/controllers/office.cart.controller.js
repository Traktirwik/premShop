import Items from "../models/items.model.js"
import gameCurrency from"../models/currency.model.js"

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

    async addToCart(req, res) {
        try{
            let newCartItem;
            if(req.body.location != "/"  && req.body.location != "/vehicle") {
                const obj = await gameCurrency.findByPk(req.body.cart)
                const findInItems = await Items.findOne({where: {id: obj.ItemId}})
                newCartItem = findInItems.id
            } 
            else {
                newCartItem = req.body.cart
            }
            const item = await this.model.findOne({where: {id: req.body.userId}})
            let arr = {...item.cart}
            if(arr.id.includes(newCartItem) == false) {
                arr.id.push(newCartItem)

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
                res.json({success: false, message: "the item is already in the cart"})
            }
                
      
            
        } catch(err) {
            console.log(err)
            res.json(err)
        }
    }
    async deleteObjectFromCart(req, res) {
        try{
            const item = await this.model.findOne({where: {id: req.body.userId}})
            let arr = {...item.cart}
            const filteredArr = arr.id.filter(item => item != req.body.cart)
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
         
        } catch(error) {
            console.log(error)
            res.json(error)
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

