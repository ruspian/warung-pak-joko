import React from 'react';
import './footer.css';
import { Assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='footer-logo' src={Assets.logo} alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit atque consequuntur incidunt voluptate. Numquam, provident nisi! Sequi obcaecati praesentium</p>
                <div className="footer-social-icons">
                    <img src={Assets.facebook} alt="" />
                    <img src={Assets.instagram} alt="" />
                    <img src={Assets.whatsapp} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Perusahaan</h2>
                <ul>
                    <li>Rumah</li>
                    <li>Tentang Kami</li>
                    <li>Pengiriman</li>
                    <li>Kebijakan Pribadi</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Kontak Kami</h2>
                <ul>
                    <li>0822-9330-0893</li>
                    <li>ruspianntb@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 © Ruspian Majid - All Right Reversed</p>
    </div>
  )
}

export default Footer
