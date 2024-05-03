import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if( response.data.success ) {
      setList(response.data.data)
    } else {
      toast.error("Error");
    }
  }

  const RemoveFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id : foodId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  } 

  useEffect(() => {
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>List Semua Makanan</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Gambar</b>
          <b>Nama</b>
          <b>Category</b>
          <b>Harga</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.gambar} alt="" />
              <p>{item.nama}</p>
              <p>{item.category}</p>
              <p>Rp. {item.harga}</p>
              <p onClick={() =>RemoveFood(item._id)} className='remove'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
