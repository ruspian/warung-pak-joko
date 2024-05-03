import React from 'react'
import './order.css'
import { useState } from 'react'
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import {Assets} from '../../assets/assets.js'

const Order = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fechAllOrder = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {orderId, status:event.target.value});
    if (response.data.success) {
      await fechAllOrder();
    }
  }

  useEffect(() => {
    fechAllOrder();
  },[]);

  return (
    <div className='order add'>
      <h3>Halaman Order</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={Assets.parcel} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if(index === order.items.length - 1) {
                    return item.nama + " x " + item.quantity;
                  } else {
                    return item.nama + ' x ' + item.quantity + ', '
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.namaDepan + " " + order.address.namaBelakang}</p>
              <div className="order-item-address">
                <p>{order.address.jalan + ', '}</p>
                <p>{order.address.dusun + ', ' + order.address.desa + ', '}</p>
              </div>  
              <p className='order-item-phone'>{order.address.noHP}</p>
            </div>
            <p>Pesanan : {order.items.length}</p>
            <p>Rp. {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} >
              <option value="Sedang Diproses!">Sedang Diproses!</option>
              <option value="Dalam Perjalanan!">Dalam Perjalanan!</option>
              <option value="Sudah Diterima!">Sudah Diterima!</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
