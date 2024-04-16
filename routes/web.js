const express = require('express')
const homeController = require('../app/http/controllers/home')
const authController = require('../app/http/controllers/auth')
const npController = require('../app/http/controllers/404')
const cartController = require('../app/http/controllers/customers/cart')
const orderController = require('../app/http/controllers/customers/order')
const adminOrderController = require('../app/http/controllers/admin/order')
const statusController = require('../app/http/controllers/admin/status')

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

//handle order
router.post('/order', auth ,orderController().store)
router.get('/order',auth, orderController().index)
router.get('/order/:id',auth, orderController().show)

//handle Admin
router.get('/admin',auth, adminOrderController().index)

//handle status of orders
router.post('/admin/order/status',auth, statusController().update)

//404 routes
router.get('/*', npController().index)




module.exports = router