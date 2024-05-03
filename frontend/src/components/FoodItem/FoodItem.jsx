import React from 'react';
import './foodItem.css';
import { Assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({id, nama, harga, deskripsi, gambar}) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url + "/images/" + gambar} alt="" />
            {!cartItems[id] ? <p className='add' onClick={() => addToCart(id)}>+</p> : 
            <div className='food-item-counter'>
                <p className='add' onClick={() => removeFromCart(id)}>-</p>
                <p> {cartItems[id]} </p>
                <p className='add' onClick={() => addToCart(id)}>+</p>
            </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-rating">
                <p>{nama}</p>
                {/* <img className='rating' src={Assets.rating} alt="" /> */}
            </div >
            <div className='rating'>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
            </div>
            <p className="food-item-desc">{deskripsi}</p>
            <p className="food-item-price">Rp.{harga}</p>
        </div>
    </div>
  )
}

export default FoodItem
