import React, { useState } from 'react';
import './cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../components/Context/StoreContext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {



  const {cartItems, listMakanan, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const Navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Nama</p>
          <p>Harga</p>
          <p>Jumlah</p>
          <p>Total</p>
          <p>Hapus</p>
        </div>
        <br />
        <hr />
        {listMakanan.map((item, index) => {
          if(cartItems[item._id] > 0 ) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.gambar} alt="" />
                  <p>{item.nama}</p>
                  <p>Rp. {item.harga}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.harga * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div> 
      <div className="cart-bottom">
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
              <p>Rp. {getTotalCartAmount() === 0 ? 0 : 5000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total </b>
              <b>RP. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5000}</b>
            </div>
          </div>
          <button onClick={() => Navigate('/order')}>BELI SEKARANG</button>
        </div>
        <div className="cart-promocode">
          <p>Masukkan kode promo anda disini</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='Kode Promo' />
            <button>Gunakan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
