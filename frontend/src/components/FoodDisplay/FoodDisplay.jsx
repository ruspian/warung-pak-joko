import React from 'react';
import './foodDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const { listMakanan } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Hidangan terbaik untuk anda</h2>
      <div className="food-display-list">
        {listMakanan.map((item, index) => {
          if(category==='All' || category === item.category) {
              return <FoodItem key={index} id={item._id} nama={item.nama} deskripsi={item.deskripsi} harga={item.harga} gambar={item.gambar} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
