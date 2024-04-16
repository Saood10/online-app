import axios from 'axios'
import Noty from 'noty'
import render from '../js/admin'
import moment from 'moment'

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

render()

let status = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hidden')
let order = hiddenInput?hiddenInput.value:null
order = JSON.parse(order)

let time = document.createElement('small') 

function updateStatus(order){
    let stepCompleted = true
    status.forEach(status =>{
        let data = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (data === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })

    

}

updateStatus(order)
