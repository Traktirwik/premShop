import prepareHtml from "../helpers/itemHtml.js"
import gameCurrency from "../models/items.model.js"


export default class currencyController {
    static async getOneById(id) {
        const result = await gameCurrency.findOne({
            where: {
                id
            }
        })
        return result

    }
    static async getHtml(req, res) {
        const item = await gameCurrency.getOneById(req.params.id)
        const html = prepareHtml(item)
        res.send(html)
    }
} 