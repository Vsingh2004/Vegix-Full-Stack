import React from 'react'
import './ExploreMenu.css'

import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu' id="explore-menu">
      <div className="explore-menu-heading">
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>Dive into the rich and diverse flavors of India with our carefully curated menu. From the spicy tang of street-style chaats to the comforting warmth of freshly made parathas, we bring you a taste of authentic Indian fast food, crafted with love and tradition. Whether you're craving crispy samosas, indulgent vadas, or a classic masala dosa, our menu is bursting with options that cater to every palate. Explore our offerings and let each bite take you on a culinary journey through the vibrant streets of India, delivered straight to your doorstep.</p>
      </div>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
            const{menu_image, menu_name} = item;
            return(
                <div onClick={() => setCategory(prev=> prev===item.menu_name? "All": item.menu_name)} className="explore-menu-list-item" key={index}>
                    <img className={category===item.menu_name? "active": ""} src={menu_image} alt={menu_name} />
                    <p>{menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
