import React, { useState } from 'react'
import './add.css'
import { Assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        nama : "",
        deskripsi : "",
        harga : "",
        category : "Bakso",
    })

    const onChangeHandler = (event) => {
        const nama = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [nama] : value}))
    } 

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nama", data.nama)
        formData.append("deskripsi", data.deskripsi)
        formData.append("harga", Number(data.harga))
        formData.append("category", data.category)
        formData.append("gambar", image)
        const response = await axios.post(`${url}/api/food/add`, formData)

        if( response.data.success ) {
            setData({
                nama : "",
                deskripsi : "",
                harga : "",
                category : "Bakso",
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Unggah Gambar</p>
            <label htmlFor="gambar">
                <img src={image ? URL.createObjectURL(image) : Assets.upload} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='gambar' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Nama Makanan</p>
            <input onChange={onChangeHandler} value={data.nama} type="text" name='nama' placeholder='Masukan Nama Makanan' />
        </div>
        <div className="add-product-description flex-col">
            <p>Deskripsi</p>
            <textarea onChange={onChangeHandler} value={data.deskripsi} type="text" name='deskripsi' rows='6' placeholder='Tulis Deskripsi' />
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Kategori</p>
                <select onChange={onChangeHandler} name='category'>
                    <option value="Bakso">Bakso</option>
                    <option value="Lalapan">Lalapan</option>
                    <option value="Nasi Goreng">Nasi Goreng</option>ß
                    <option value="Gado-Gado">Gado-Gado</option>
                    <option value="Mie Ayam">Mie Ayam</option>
                    <option value="Mie">Mie</option>
                    <option value="Sate">Sate</option>
                </select>   
            </div>
            <div className="add-price flex-col">
                <p>Harga</p>
                <input onChange={onChangeHandler} value={data.harga} type="Number" name='harga' placeholder='Rp.1000' />
            </div>
        </div>
        <button type='submit' className='add-button' >TAMBAH</button>
      </form>
    </div>
  )
}

export default Add
