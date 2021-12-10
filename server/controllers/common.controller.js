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
            const result = await this.model.upadte(req.body, {
                where: {
                    ...req.params
                }
            })
            res.send(result)
        }
        catch (err) {
            res.send(err)
        }
    }
    async deleteById(req, res) {
        try {
            const result = await this.model.destroy({
                where: {
                    ...req.params
                }
            })
        }
        catch (err) {
            res.send(err)
        }
    }

}