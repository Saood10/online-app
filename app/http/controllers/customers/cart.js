function cartController(){
    return{
        index(req,res){
            if (req.session.cart) {
                const cartItems = Object.values(req.session.cart.items)
                const cartTotal = req.session.cart.totalPrice
                return res.render('customers/cart', {cartItems , cartTotal})
            }
            return res.render('customers/cart', {cartItems:undefined })
        },

        update(req,res){
            if(!req.session.cart){
                req.session.cart = {
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
            }
            let cart = req.session.cart


            if(!cart.items[req.body._id]){

                cart.items[req.body._id] = {
                    item:req.body,
                    qty:1
                }
            }else{
                cart.items[req.body._id].qty += 1
                
            }
            cart.totalQty += 1
            cart.totalPrice += req.body.price

            return res.json({totalQty:req.session.cart.totalQty})

        }
    }
}

module.exports = cartController