import prepareHtml from "../helpers/itemHtml.js"
import Items from "../models/items.model.js"


export default class ItemsController {
    static async getOneById(id) {
        const result = await Items.findOne({
            where: {
                id
            }
        })
        return result

    }
    static async getHtml(req, res) {
        const item = await ItemsController.getOneById(req.params.id)
        const html = prepareHtml(item)
        res.send(html)
    }
} 