import React, { useContext} from 'react'
import { assets } from '../../assets/assets'

import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name, image, price, description, category}) => {

    // const [itemCount, setItemCount] = useState(0)
    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+ "/images/" + image} alt={name} className="food-item-image" />
            { !cartItems[id]
                      ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                      : <div className="food-item-counter">
                        <img className='remove' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                      </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">Rs. {price}</p>
        </div>
    </div>
  )
}

export default FoodItem
