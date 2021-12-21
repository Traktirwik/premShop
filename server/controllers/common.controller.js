import gameCurrency from "../models/currency.model.js"
import Items from "../models/items.model.js"
import Premium from "../models/premium.model.js"


export default class CommonController {
    constructor(model) {
        this.model = model
    }

    async getAll(req, res) {
        try {
            const result = await this.model.findAll({order:[['price', 'ASC']]})          
            res.send(result)
        }
        catch (err) {
            res.send(err)
        }
    }

    async getVehicle(req, res) {
        try {
            const result = await this.model.findAll({where: {type: ["SPG", "mediumTank", "lightTank", "heavyTank", "AT-SPG"]}, order:[['price', 'ASC']]})
            res.json(result)
        } catch(error) {
            console.log(error)
            res.json(error)
        }
    }

    async create(req, res) {
        
        try {
            const result = await this.model.create(req.body)
            res.send(result)
        }
        catch (err) {
            res.send(err)
        }
    }
    async updateById(req, res) {
        console.log(req.body,":::::::::::::!!!!!!!!!!!!!!!!!!!!::::::::::::::::::::::::::::")
        console.log(req.params)
        try {
            let oldPrice;
            let sale;
            let updateId;
            if(req.body.location == "/gold") {
                const obj = await gameCurrency.findByPk(req.params.id)
                console.log(obj)
                const objToUpdate = await Items.findOne({where: {id: obj.ItemId}})
                updateId = objToUpdate.id
            } else if (req.body.location == "/premium") {
                const obj = await Premium.findByPk(req.params.id)
                console.log(obj)
                const objToUpdate = await Items.findOne({where: {id: obj.ItemId}})
                updateId = objToUpdate.id
            } else {
                updateId = req.params.id
            }
            if(req.body.sale == true) {
                try{
                    const oldModel = await this.model.findByPk(updateId)
                    console.log(oldModel)
                    oldPrice = oldModel.price
                    const newPrice = req.body.price
                    if(oldPrice > newPrice) {
                        sale = (oldPrice-newPrice)/oldPrice*100
                        Object.assign(req.body, {sale: [sale,oldPrice]})
                    } else {
                        res.json({success: false, message: "incorrect price"})
                    }
                } catch(error) {
                    console.log(error)
                    res.json(error)
                }
            } 
            const result = await this.model.update(req.body, {
                where: {
                    id: updateId
                }
            })
            if(result[0] == 0) {
                res.json({success: false, error: `item with id ${updateId} is not exist`})
            } else {
                if(sale) {
                    console.log("ASDASDASDASDASDASDQWEQWEQWE")
                    res.json({success: true, id: updateId, sale: sale, oldPrice: oldPrice})
                } else {
                    res.json({success: true, id: updateId, message: `item with id ${updateId} was updated`})
                }
            }
        }
        catch (err) {
        
            console.log(err, "HEEEEEEEEEEEEEEEEEEEEEEEEEEEERE")
            res.send(err)
        }
    }
    async deleteById(req, res) {
        try {
            let updateId;
            if(req.body.location == "/gold") {
                const obj = await gameCurrency.findByPk(req.params.id)
                console.log(obj)
                const objToUpdate = await Items.findOne({where: {id: obj.ItemId}})
                updateId = objToUpdate.id
            } else if (req.body.location == "/premium") {
                const obj = await Premium.findByPk(req.params.id)
                console.log(obj)
                const objToUpdate = await Items.findOne({where: {id: obj.ItemId}})
                updateId = objToUpdate.id
            } else {
                updateId = req.params.id
            }
            const result = await this.model.destroy({
                where: {
                    id: updateId
                }
            })
            if(result == 0) {
                res.json({success: false, error: `item with id ${updateId} is  ot exist`})
            } else {
                res.json({success: true, id: updateId, message: `item with id ${updateId} was deleted`})
            }
        }
        catch (err) {
            res.send(err)
        }
    }
    async getOneById(req, res) {
        const result = await this.model.findOne({
            where: {
                ...req.params
            }
        })
        res.send(result)

    }

}