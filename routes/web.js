const express = require('express')
const homeController = require('../app/http/controllers/home')
const authController = require('../app/http/controllers/auth')
const cartController = require('../app/http/controllers/customers/cart')
const router = express.Router()


//home page
router.get('/', homeController().index)

//cart page
router.get('/cart',cartController().index ) 

//login
router.get('/login', authController().login)

//register
router.get('/register', authController().register)

//handle update cart
router.post('/update-cart', cartController().update)


module.exports = router