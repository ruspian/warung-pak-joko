import React from 'react'
import { Assets } from '../../assets/assets'
import './sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img className='gambar' src={Assets.add} alt="" />
            <p>Tambah Makanan</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img className='gambar' src={Assets.list} alt="" />
            <p>List Makanan</p>
        </NavLink>
        <NavLink to='/order' className="sidebar-option">
            <img className='gambar' src={Assets.order} alt="" />
            <p>Order</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
