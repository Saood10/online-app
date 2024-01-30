const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
require('./app/config/db/db_connect')
require('dotenv').config()
const session = require('./app/config/sessions/session')
const flash = require('express-flash')

const PORT = process.env.PORT || 1000

// Set up static files directory
app.use(express.static('public'))

//use json
app.use(express.json())
//url parse
app.use(express.urlencoded({extended:false}))

//cookies
// app.use(express.cookieParser());

//session store in db
app.use(session)

//flash msg
app.use(flash())

//global var
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})


// Set the views directory
const viewPath = path.join(__dirname, '/resources/views')
app.set('views', viewPath)


// Set the view engine to EJS
app.set('view engine', 'ejs')

// Use Express Layouts middleware
app.use(expressLayouts)

// Define a route to render the 'home' view
app.use('/' , require('./routes/web'))

// Start the server
app.listen(PORT, () => {
    console.log('Running on port ' + PORT)
})
