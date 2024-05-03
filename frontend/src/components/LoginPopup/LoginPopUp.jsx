import React, { useContext } from 'react';
import './loginPopUp.css';
import { useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState("Masuk");

  const [data, setData] = useState({
    nama: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const nama = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [nama] : value}))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Masuk") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <p onClick={() => setShowLogin(false)}>X</p>
        </div>
        <div className="login-popup-inputs">
          {currState === "Masuk" ? <></> : <input name='nama' onChange={onChangeHandler} value={data.nama} type="text" placeholder='Masukkan Nama' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Masukkan Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Daftar" ? "Buat Akun" : "Masuk"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>Dengan Melanjutkan, Saya Menyetujui Ketentuan Penggunaan & Kebijakan Privasi</p>
        </div>
        {currState === "Masuk" ? <p>Buat Akun Baru? <span onClick={() => setCurrState("Daftar")}>Klik Disini</span></p> : <p>Sudah Punya Akun? <span onClick={() => setCurrState("Masuk")}>Masuk</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp
