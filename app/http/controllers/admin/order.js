const Order = require('../../../models/order')
const moment = require('moment')

function adminOrderController(){
    return{
        async index(req,res){
            
            try{
                const order = await Order.find({status:{$ne:'completed'}} , null ,  { sort:{ 'createdAt' : -1} } ).
                populate({
                    path: 'customerId',
                    // Explicitly exclude `password`
                    select: '-password',
                }).exec()
                
                res.status(200).render('admin/order', {orders : order , moment})
            }
            catch(e){
                res.status(500).send(e)
    
            }

        }
    }
}

module.exports = adminOrderController