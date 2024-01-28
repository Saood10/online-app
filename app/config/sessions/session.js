const url = require('../db/db_connect')
const session = require('express-session')
const MongoStore = require('connect-mongo')

//SESSIONS
module.exports = session({
                secret: process.env.COOKIE_SEC,
                saveUninitialized:true,
                cookie: { maxAge: (1000*60*60) },
                resave: false,
                store: MongoStore.create({      // session store
                        mongoUrl : url,
                        Collection : 'sessions'

                    })
            })
