import React from 'react';
import { menuList } from '../../assets/assets';
import './exploreMenu.css';


const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Cari Menu Makanan</h1>
      <p className='explore-menu-text'>Pilih makanan yang anda suka! <br/>Makan di warung Pak Joko nggak cuma enak, tapi juga bikin semangat!</p>
      <div className="explore-menu-list">
        {menuList.map((item, index) => {
            return (
                <div onClick={() => setCategory(prev => prev === item.nama ? "All" : item.nama)} key={index} className="explore-menu-list-item">
                    <img className={category === item.nama ? "active" : "" } src={item.gambar} alt="" />
                    <p>{item.nama}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
