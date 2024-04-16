const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const regex = /^\/order\/.*/;

const auth = async (req,res,next)=>{  // next is used to redirect it to the router otherwise it will wait in this fxn

    try{

        const token = req.session.token
        if (!token) {
            if( regex.test(req.originalUrl) ||  req.originalUrl =='/admin'){ // handle if req is from order so to give user_id
                return res.redirect('/login')
            }
            return next()
        }
        const decoded = jwt.verify(token ,process.env.JWT_SEC )
        const user = await User .findOne({ _id : decoded._id , 'tokens.token' : token })

        if(user.role === "admin"){
            if( req.originalUrl == '/order'){ // handle if req is from order so to give user_id
                return res.redirect('/admin')
            }
            return next()
        }
        else{
            if( req.originalUrl == '/order'){ // handle if req is from order so to give user_id
                req.session._id = user._id
                return next()
            }

            if(!user){
                return next()
            }
            if (regex.test(req.originalUrl)) {
                req.session._id = user._id
                return next()
            }
            res.redirect('/order')
        }


    }catch(e){
        res.status(400).send(e)
    }


}

module.exports = auth