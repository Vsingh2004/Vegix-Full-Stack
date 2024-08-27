import React from 'react'

import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-[4%] py-2'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <img className='p-10' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
