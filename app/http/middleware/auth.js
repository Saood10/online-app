const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const auth = async (req,res,next)=>{  // next is used to redirect it to the router otherwise it will wait in this fxn

    try{

        const token = req.session.token
        const decoded = jwt.verify(token ,process.env.JWT_SEC )
        const user = await User .findOne({ _id : decoded._id , 'tokens.token' : token})

        if(!user){
            return next()
        }
        return res.redirect('/')

    }catch(e){
        return next()
    }


}

module.exports = auth