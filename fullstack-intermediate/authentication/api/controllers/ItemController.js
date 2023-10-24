const { Item, User } = require('../models')
const { tokenVerifier } = require('../helpers/jsonwebtoken')

class ItemControler {
    static async getAllItems(req, res) {
        try {
            let items = await Item.findAll({
                include: [User]
            })

            res.status(200).json(items)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            const { name, type, price, stock, image } = req.body
            const UserId = +req.userData.id

            let result = await Item.create({
                name, type, price, stock, image, UserId
            })

            res.status(201).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static update(req, res) {

    }

    static delete(req, res) {

    }

    static getItemById(req, res) {

    }
}

module.exports = ItemControler