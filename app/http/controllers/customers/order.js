const flash = require('express-flash')
const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return{
        async store(req,res){
            const {phone , address } = req.body
            if(!phone || !address){
                req.flash('error' , 'provide details')
                return res.redirect('/cart')
            }
            try {
                const order = new Order({
                    customerId:req.session._id,
                    items: req.session.cart.items,
                    phone,
                    address,
                })
                await order.save()
                req.flash('success' , 'Order Placed')
                delete req.session.cart
                return res.redirect('/order')
            }
            catch (error) {
                req.flash('error' , error)
                res.status(400).render('customers/order')
            }
            

        },
        async index(req,res){
            try {
                const order = await Order.find({
                    customerId : req.session._id} ,  
                    null,
                    {sort: { createdAt : -1}})
                if (order) {
                    const orderObj = Object.values(order)
                    res.header('Cache-Control' , 'no-cache , private , no-store , must-revalidate , max-stale=0 , post-check=0 , pre-check=0')
                    return res.render('customers/order', {orders:orderObj , moment})
                }
                res.render('customers/order', {orders:undefined })
            }
            catch (error) {
                req.flash('error' , error)
                res.status(400).render('customers/order')
            }
        }
    }
}

module.exports = orderController