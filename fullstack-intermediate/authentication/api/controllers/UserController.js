const { User } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator, tokenVerifier } = require('../helpers/jsonwebtoken')

class UserController {
    static async getAllUsers(req, res) {
        try {
            let users = await User.findAll()

            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password, } = req.body

            let result = await User.create({
                username, email, password,
            })
            res.status(201).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            let emailFound = await User.findOne({
                where: {
                    email
                }
            })

            if (emailFound) {
                if (decryptPwd(password, emailFound.password)) {
                    let access_token = tokenGenerator(emailFound)

                    res.status(200).json({ access_token })

                    let verifyToken = tokenVerifier(access_token)
                    console.log(verifyToken)
                } else {
                    res.status(403).json({
                        message: "Invalid password!"
                    })
                }
            } else {
                res.status(404).json({
                    message: 'User not found!'
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id
            const { username, email, password } = req.body;
            let result = await User.update({
                username, email, password
            }, {
                where: { id }
            })

            res.status(201).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id
            let result = await User.destroy({
                where: { id }
            })
            result === 1 ?
                res.status(200).json({
                    message: `User id ${id} deleted successfully!`
                }) :
                res.status(404).json({
                    message: `User id ${id} not deleted successfully!`
                })
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getUserById(req, res) {
        try {
            const id = +req.params.id
            let result = await User.findByPk(id)

            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController