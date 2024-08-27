import React from 'react'
import {assets} from '../../assets/assets'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <span>We are Vegix</span>
        <h1>Choose Vegix <br /> the Best Indian <br /> Snacks store</h1>
        <a href="#" class="btn">Shop Now <i class='bx bxs-right-arrow-circle'></i></a>
      </div>
      <img src={assets.header_img} alt="" />
    </div>
  )
}

export default Header
