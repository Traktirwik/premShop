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
        console.log(req.body)
        console.log(req.params)
        try {
            const result = await this.model.update(req.body, {
                where: {
                    ...req.params
                }
            })
            if(result[0] == 0) {
                res.json({success: false, error: `item with id ${req.params.id} is not exist`})
            } else {
                res.json({success: true, id: req.params.id, message: `item with id ${req.params.id} was updated`})
            }
        }
        catch (err) {
            res.json({error: err})
        }
    }
    async deleteById(req, res) {
        try {
            const result = await this.model.destroy({
                where: {
                    ...req.params
                }
            })
            if(result == 0) {
                res.json({success: false, error: `item with id ${req.params.id} is  ot exist`})
            } else {
                res.json({success: true, id: req.params.id, message: `item with id ${req.params.id} was deleted`})
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