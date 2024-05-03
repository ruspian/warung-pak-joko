import React from 'react'
import './navbar.css';
import { Assets } from '../../assets/assets';


const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={Assets.logo} alt="" /> 
        <img className='profil' src={Assets.profil} alt="" /> 
    </div>
  )
}

export default Navbar
