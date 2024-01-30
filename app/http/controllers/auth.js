const jwt = require('jsonwebtoken')
const flash = require('express-flash')
const mongoose = require('mongoose')
const User = require('../../models/user')



function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },

        register(req,res){
            res.render('auth/register')
        },

        async postRegister(req,res){
            const {name , email , password } = req.body
            try {
                const user = new User(req.body)
                await user.save()
                req.flash('success' , 'registered successfully')
                return res.redirect('/login')
                
                
            }catch (error) {
                if (error instanceof mongoose.Error.ValidationError || error.errmsg ) {
                // Handle Mongoose validation errors
                let validationMsg = error.errmsg ? 
                [ 'email taken ' ]
                        :
                 Object.values(error.errors).map(
                    (err) => err.message
                    )
                    req.flash('error' , validationMsg)
                return res.status(400).render('auth/register', {
                    name,
                    email,
                    password
                });
                }
        
                // Handle other types of errors
                console.log(error);
                res.status(500).send('<h1>Internal Server Error</h1>');

            }
        },

        async postLogin(req,res){

            const { email , password } =  req.body

                try{
            
                    const user = await User.findBy(email , password)
                    const token = await user.generateAuthToken()
            
                    req.session.token = token
                    req.flash('success' , 'loged in successfully')
                    return res.redirect('/')
            
                }catch(error){
                    req.flash('error' , error)
                    return res.status(400).render('auth/login' , {
                        email,
                        password
                    })
                }
                
        },

        async logout(req,res){

            try {
                const token = req.session.token
                const decoded = jwt.verify(token , process.env.JWT_SEC )
                let user = await User .findOne({ _id : decoded._id , 'tokens.token' : token})
                user.tokens = user.tokens.filter((token)=> {
                    return token.token != req.session.token                   // token != current token in session
                })
                await user.save()

                delete req.session.token
                res.redirect('login')

            }
            catch (error) {
                console.log(error);
                return res.status(500).send(error)
            }
        }

    }
}


module.exports = authController