import React from 'react';
import './appDownload.css';
import { Assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>Untuk Pengalaman Yang Lebih Baik Unduh <br/> Aplikasi Warung Pak Joko</p>
      <div className="app-download-platform">
        <img src={Assets.playStore} alt="" />
        <img src={Assets.appStore} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
