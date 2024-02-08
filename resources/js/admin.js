import axios from 'axios'
import moment from 'moment'

const orderList = document.querySelector(".orders-js")

function renderItems(items) {
    return Object.values(items).map(item =>{
        return `
            <p> ${item.item.name} -${item.qty} pcs </p>
        `
    }).join('')
}

function generateHtml(orders){
    return orders.map(order=>{
        return `
        <tr>
            <td class=" border p-2">
                <p class="order-id">${order._id}</p>
                <div class="w-40"><%=%>${renderItems(order.items)}</div>
            </td>
            <td class="border p-2">
                ${order.customerId.name}
            </td>
            <td class="border p-2">
                ${order.address}
            </td>
            <td class="border p-2">
                ${order.phone}
            </td>
            <td class="border p-2">
            <select name="cars" id="cars">
                <option value="order_placed"
                ${order.status === 'order_placed' ? 'selected' : ''}>
                Placed</option>
                <option value="confirmed"
                ${order.status === 'confirmed' ? 'selected' : ''}>
                Confirmed</option>
                <option value="prepared"
                ${order.status === 'prepared' ? 'selected' : ''}>
                Prepared</option>
                <option value="delevered"
                ${order.status === 'delevered' ? 'selected' : ''}>
                Delevered</option>
                <option value="completed"
                ${order.status === 'completed' ? 'selected' : ''}>
                Completed</option>
            </select>

            </td>
            <td class="border p-2">
                ${order.paymentType}
            </td>
            <td class="border p-2">
                ${moment(order.createdAt).format('hh:mm A')}
            </td>
        </tr>
        `
    }).join('')
}

function renderAdmin(){
    let orders = []
    let markup

    axios.get('/admin' , {
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res =>{
        orders = res.data
        markup = generateHtml(orders)
        orderList.innerHTML = markup

    }).catch(error =>{
        console.log(error);
    })
}

module.exports = renderAdmin