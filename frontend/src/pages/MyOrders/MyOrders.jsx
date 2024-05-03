import React, { useContext, useEffect, useState } from 'react'
import './myOrder.css'
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';
import { Assets } from '../../assets/assets';


const MyOrders = () => {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, {headers: {token}});
        setData(response.data.data);
    }

    useEffect(() => {
        if ( token ) {
            fetchOrders();
        }
    },[token])


  return (
    <div className='my-orders'>
      <h2>Belanjaan Saya</h2>
      <div className="container">
        {data.map((orders, index) => {
            return (
                <div key={index} className='my-orders-order'>
                    <img src={Assets.tas} alt="" />
                    <p>{orders.items.map((item, index) => {
                        if (index === orders.items.length - 1) {
                            return item.nama + " x " + item.quantity;
                        } else {
                            return item.nama + " x " + item.quantity + " , "
                        }
                    })}</p>
                    <p>Rp. {orders.amount}</p>
                    <p>Jumlah :  {orders.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{orders.status}</b></p>
                    <button>Cari</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders
