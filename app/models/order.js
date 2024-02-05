const mongoose = require('mongoose')
const User = require('../models/user')

const orderSchema = mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User            // creating reference of order with user so that we can use populated on order
    },
    items:{
        type:Object,
        required : true ,

    },
    phone:{
        type: String,
        required : true ,

    },
    address:{
        type:String,
        required : true ,

    },
    paymentType:{
        type:String,
        default : 'COD'
    },
    status:{
        type:String,
        default : 'order placed'
    }
},{
    timestamps:true
})

const Order = mongoose.model('Order' , orderSchema)

module.exports = Order