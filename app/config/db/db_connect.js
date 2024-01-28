const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/Pizza_store'
mongoose.connect(url)
.then(()=> console.log('connected')).catch(err=>console.log(err))

module.exports = url