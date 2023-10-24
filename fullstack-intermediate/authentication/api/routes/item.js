const itemRoute = require('express').Router()
const ItemController = require('../controllers/ItemController')
const { authentication} = require('../middlewares/auth')

itemRoute.get(
    '/',
    ItemController.getAllItems
)
itemRoute.post('/',
    authentication,
    ItemController.create
)
itemRoute.put('/:id', ItemController.update)
itemRoute.delete('/:id', ItemController.delete)
itemRoute.get('/account/:id', ItemController.getItemById)

module.exports = itemRoute