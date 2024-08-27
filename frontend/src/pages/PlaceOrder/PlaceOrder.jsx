import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'


const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);
  
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id; // Adjust this line based on your token's structure
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const PlaceOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item)=> {
      if (cartItems[item._id]> 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() +2,
      userId: userId,
    };
    
    try {
    let response = await axios.post(url + "/api/order/place", orderData, {headers: {token}});
    console.log('Order response:', response.data);
    if (response.data.success) {
      const { orderId, amount, currency, key, newOrderId } = response.data;

      const options = {
        key, 
        amount: amount * 100, 
        currency,
        name: "Your Company Name",
        description: "Order Payment",
        image: "https://yourlogo.com/logo.png", // replace with your logo URL
        order_id: orderId,
        handler: function (response) {
          console.log('Payment response:', {
            razorpay_payment_id: response.razorpay_payment_id, 
            razorpay_order_id: orderId, 
            razorpay_signature: response.razorpay_signature, 
            userId: userId, 
            items: orderData.items, 
            amount: orderData.amount, 
            address: orderData.address 
          });
          axios.post(url + "/api/order/verify", {
            razorpay_order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            newOrderId: newOrderId,
            userId: userId,  // Include userId
            items: orderData.items,    // Include items
            amount: orderData.amount,  // Include amount
            address: orderData.address // Include address
          }, {headers: {token}})
          .then(res => {
            console.log('Verification response:', res.data);
            if(res.data.success) {
              // window.location.replace(`${url}/verify?success=true&orderId=${orderId}`);
              window.location.replace(`/myorders`);
            } else {
              alert("Payment verification failed");
            }
          })
          .catch(error => {
      console.error("Error verifying payment", error);
      alert("Error verifying payment")
    });
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  } catch (error) {
    console.error("Error placing order", error);
    alert("Errorrrrr placing order");
  }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if(!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount() ===0)
    {
      navigate ('/cart')
    }
  })

  return (
    <form onSubmit={PlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-delivery-fee">
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0: 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs. {getTotalCartAmount() === 0 ? 0:  getTotalCartAmount() +2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
