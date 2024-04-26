const Order = require('../../../models/order')

function statusController(){
    return{
        async update(req,res){

            try {
                await Order.findByIdAndUpdate( req.body.orderId , {status: req.body.status})
                
                // Emit event
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderupdated' , {id: req.body.orderId , status : req.body.status})
                return res.redirect('/admin')
            } catch (err) {
                return res.redirect("/admin")
            }
            
        }
    }
}

module.exports = statusController