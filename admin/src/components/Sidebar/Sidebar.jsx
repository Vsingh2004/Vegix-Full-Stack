import React from 'react'
import { assets } from '../../assets/assets'

import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-[100vh] border-2 border-solid border-[#a9a9a9] border-t-0 text-[max(1vw, 10px)] '>
      <div className='pt-12 pl-[20%] flex flex-col gap-6  '>
        <NavLink to = '/add' className='flex items-center gap-3 border border-[#a9a9a9] border-r- py-2 px-3 rounded-tl-md rounded-tr-0 rounded-br-0 rounded-bl-sm cursor-pointer sidebar-option'>
          <img src={assets.add_icon} alt="" />
          <p >Add Items</p>
        </NavLink>
        <NavLink to = '/list' className='flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-3 rounded-tl-md rounded-tr-0 rounded-br-0 rounded-bl-sm cursor-pointer sidebar-option'>
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to = '/orders' className='flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-3 rounded-tl-md rounded-tr-0 rounded-br-0 rounded-bl-sm cursor-pointer sidebar-option'>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
