import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll(".add-to-cart")
let cartCounter = document.querySelector(".cartqty")


function  updateCart(pizza){
    // send post req to change the cart in db
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type:'success',
            text:'Added to Cart',
            timeout : 1000,
            progressBar:false
        }).show()
    }).catch(e=>{
        new Noty({
            type:'error',
            text:'Something went wrong',
            timeout : 1000,
            progressBar:false
        }).show()
    })
}

addToCart.forEach(btn => {
    btn.addEventListener('click' , (e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
});

const msg = document.querySelector(".msg")

if(msg){
    setTimeout(()=>{
        msg.remove()
    },2000)
}

