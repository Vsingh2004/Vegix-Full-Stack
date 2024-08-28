import React from 'react'

import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <p>Delivering authentic Indian fast food and snacks right to your doorstep, combining tradition with convenience. From the bustling streets of Mumbai to the vibrant flavors of Delhi, we bring the essence of India’s rich culinary heritage to your home. Whether you're craving the fiery spice of a classic chaat or the comforting warmth of a freshly made paratha, our menu offers a diverse selection that caters to every taste.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='footer-content-bottom'>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">About us</a></li>
                <li><a href="">Delivery</a></li>
                <li><a href="">Privacy policy</a></li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li><a href="">+91 7393040052</a></li>
                <li><a href="https://www.linkedin.com/in/vssingh2004">contact@vegix.com</a></li>
                <li><a href="https://github.com/Vsingh2004" target='blank'>/Vaibhav Singh</a></li>
                <li><a >Lucknow, Uttar Pardesh, 226028</a></li>
            </ul>
        </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Vegix.com -All RIght Reserved.</p>
    </div>
  )
}

export default Footer
