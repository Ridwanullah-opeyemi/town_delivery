import { useState } from 'react'
import axios from "axios"
import './order.css'
import { useEffect } from 'react';
import assets from '../../assets/assets.js';

const Order = ({url})=>{

  const [orders,setOrders] = useState([]);

  const fetchAllOrder = async () => {
    const res = await axios.get(url+"/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data)
    }else{
      alert("error")
    }
  }

  const statusHandler = async (e,orderId) => {
    const res = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if (res.data.success) {
      await fetchAllOrder();
    }
  }
  
  useEffect(()=>{
    fetchAllOrder()
    console.log(orders);
  },[])
   return(
    <div className= "order">
      <div className="order_list">
        {
          orders.map((order,index)=>(
            <div className="order_item" key={index} >
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order_item_food">
                  {order.items.map((item,i)=>{
                    if (i === order.items.length-1) {
                      return item.name + " x " + item.quantity
                    }
                    else{
                      return item.name + " x " + item.quantity + ","
                    }
                  })}
                </p>
                <p className="order_item_name">{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order_item_address">
                  <p>{order.address.street}</p>
                  <p>{order.address.city+" "+order.address.state+" "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className="order_item_phone">{order.address.phone}</p>
                <p className="order_item_phone">{order.address.email}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
   )
}

export default Order