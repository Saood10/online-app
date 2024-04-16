const Order = require('../../../models/order')

function statusController(){
    return{
        async update(req,res){

            try {
                await Order.findByIdAndUpdate( req.body.orderId , {status: req.body.status})
                return res.redirect("status")
            } catch (err) {
                return res.redirect("/admin")
            }
            
        }
    }
}

module.exports = statusController