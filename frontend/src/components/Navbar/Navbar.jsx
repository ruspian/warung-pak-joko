import React, { useState } from 'react';
import { Assets } from '../../assets/assets';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState('beranda');

    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }

  return (
    <div className='navbar'>
      <Link to='/'><img src={ Assets.logo } alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('beranda')} className={menu === 'beranda'?'active':''}>Beranda</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu'?'active':''}>Menu</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app'?'active':''}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu('kontak-saya')} className={menu === 'kontak-saya'?'active':''}>Kontak Saya</a>
      </ul>
      <div className="navbar-right">
        <img src={Assets.search} alt="" className='search'/>
        <div className="navbar-search">
            <Link to='/cart'><img src={Assets.keranjang} alt="" className='keranjang'/></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot" }></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} >Masuk</button> : <div className='navbar-profile'>
          <img src={Assets.profil} alt="" />
          <ul className='nav-profile-dropdown'>
            <li onClick={() => navigate('/myorders')}><img src={Assets.tas} alt="" /><p>Belanja</p></li>
            <hr />
            <li onClick={logout}><img src={Assets.logOut} alt="" /><p>Keluar</p></li>
          </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
