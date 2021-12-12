export default class CommonController {
    constructor(model) {
        this.model = model
    }

    async getAll(req, res) {
        try {
            const result = await this.model.findAll()
            res.send(result)
        }
        catch (err) {
            res.send(err)
        }
    }

    async create(req, res) {
        try {
            const result = await this.model.create(req.body)
            res.send(result)
        }
        catch (err) {
            res.send(result)
        }
    }
    async updateById(req, res) {
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