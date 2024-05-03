import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../components/Context/StoreContext';
import MidtransPayment from '../../components/MidtransPayment/MidtransPayment.jsx';
import './placeOrder.css'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, listMakanan, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    namaDepan: "",
    namaBelakang: "",
    noHP: "",
    email: "",
    jalan: "",
    dusun: "",
    desa: "",
  });
  const [transactionToken, setTransactionToken] = useState(null); // State untuk menyimpan token transaksi
  const [paymentStarted, setPaymentStarted] = useState(false); // State untuk menentukan apakah pembayaran sudah dimulai
  const [sessionUrl, setSessionUrl] = useState(''); // Menyimpan URL sesi dari respons server


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    listMakanan.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    let orderData = {
      userId: "", // Add userId if needed
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5000,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { transactionToken, sessionUrl } = response.data;
        setTransactionToken(transactionToken);
        setSessionUrl(sessionUrl); // Menyimpan sessionUrl ke state
        setPaymentStarted(true); // Setelah mendapatkan token, mulai pembayaran
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  // menyembunyikan halaman pembayaran jika tidak ada user
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount === 0) {
      navigate("/cart")
    }
  },[token])


  return (
    <div id="snap-container" >
      {paymentStarted ? 
        <MidtransPayment transactionToken={transactionToken} sessionUrl={sessionUrl} />
       :    // Jika belum ada token transaksi, tampilkan form pesanan
        <form onSubmit={placeOrder} className='place-order'>
          <div className="place-order-left">
            <p className='title'>Informasi Pengiriman</p>
            <div className="multi-field">
              <input required name='namaDepan' onChange={onChangeHandler} value={data.namaDepan} type="text" placeholder='Nama Depan'/>
              <input required name='namaBelakang' onChange={onChangeHandler} value={data.namaBelakang} type="text" placeholder='Nama Belakang'/>
            </div>
            <input required name='noHP' onChange={onChangeHandler} value={data.noHP} type="text" placeholder='Nomor Handphone' />
            <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Alamat Email' />
            <div className="multi-fields">
              <input required name='jalan' onChange={onChangeHandler} value={data.jalan} type="text" placeholder='Nama Jalan'/>
              <input required name='dusun' onChange={onChangeHandler} value={data.dusun} type="text" placeholder='Nama Dusun'/>
            </div>
            <input required name='desa' onChange={onChangeHandler} value={data.desa} type="text" placeholder='Nama Desa' />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Total Belanja</h2>
              <div>
                <div className="cart-total-details">
                  <p>Harga</p>
                  <p>RP. {getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Biaya Pengiriman</p>
                  <p>Rp.{getTotalCartAmount() === 0 ? 0 : 5000}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total </b>
                  <b>RP. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5000}</b>
                </div>
              </div>
              <button type='submit' id='pay-button' >BAYAR</button>
            </div>
            <br />
          <p><strong>Note : </strong>Untuk Ongkir Pembayaran Manual </p>

          </div>
        </form>
      }
    </div>
  );
}

export default PlaceOrder;
