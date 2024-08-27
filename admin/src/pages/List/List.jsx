import React, { useEffect, useState } from 'react'

import './List.css'
import axios from "axios"
import  {toast} from "react-toastify"

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
    await fetchList();
    if (response.data.success) {
      toast.success("Food Removed")
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=> {
    fetchList();
  }, [])

  return (
    <div className='flex flex-col p-20 w-4/5'>
      <p  className='mb-5 text-xl font-bold text-center'>All Foods List</p>
      <div >
        <div className='list-table-format title items-center gap-2 py-3 px-4 border border-solid border-[#cacaca] text-md   bg-[#f9f9f9]'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=> {
          return (
            <div className=' list-table-format items-center gap-2 py-3 px-4 border border-solid border-[#cacaca] text-md' key= {index}>
              <img className='w-20 rounded-md' src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=> removeFood(item._id)} className='cursor-pointer'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
