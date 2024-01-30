const express = require('express')
const homeController = require('../app/http/controllers/home')
const authController = require('../app/http/controllers/auth')
const npController = require('../app/http/controllers/404')
const cartController = require('../app/http/controllers/customers/cart')
const router = express.Router()
const auth = require('../app/http/middleware/auth') 


//home page
router.get('/', homeController().index)

//cart page
router.get('/cart',cartController().index ) 

//login
router.get('/login', auth , authController().login)

//register
router.get('/register',auth, authController().register)

//handle update cart
router.post('/update-cart', cartController().update)

//handle register
router.post('/register', authController().postRegister)

//handle login 
router.post('/login', authController().postLogin)

//handle logout
router.post('/logout', authController().logout)

router.get('/*', npController().index)




module.exports = router