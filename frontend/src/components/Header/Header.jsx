import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-content">
        <h2>Warung Pak Joko</h2>
        <p>Pengen makan enak, tapi kantong tipis? <br/> Makan di warung pak Joko, makan enak gak bikin kantong nangis!</p>
        <button>Lihat Menu</button>
      </div>
    </div>
  )
}

export default Header
