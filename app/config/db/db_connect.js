const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/Pizza_store'
mongoose.connect(url)
.then(()=> console.log('connected')).catch(err=>console.log(err))

// const menuSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     price: Number,
//     size: String
// });

// const Menu = mongoose.model('Menu', menuSchema);

// module.exports = Menu;


// // Read the JSON file
// const menuData = require('../../../pizza-menu.json');

// // Insert the menu data into the database
// Menu.insertMany(menuData)
//     .then(result => {
//         console.log('Menu data imported successfully:', result);
//         mongoose.disconnect(); // Disconnect from MongoDB after importing data
//     })
//     .catch(error => {
//         console.error('Error importing menu data:', error);
//         mongoose.disconnect(); // Disconnect from MongoDB in case of error
//     });


module.exports = url