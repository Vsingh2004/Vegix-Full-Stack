import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Verify.css'; 
import { StoreContext } from '../../context/StoreContext';

const VerifyPayment = () => {
  const {token} = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const verifyPayment = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/order/verify', {
          userId: token?.userId,
          razorpay_payment_id: query.get('razorpay_payment_id'),
          razorpay_order_id: query.get('razorpay_order_id'),
          razorpay_signature: query.get('razorpay_signature')
        });

        if (response.data.success) {
          setVerificationStatus('Payment verified successfully!');
          setTimeout(() => {
            navigate('/myorders');
          }, 2000);
        } else {
          setVerificationStatus('Payment verification failed.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('An error occurred during verification.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, navigate, token?.userId]);

  return (
    <div className="verify">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>{verificationStatus}</div>
      )}
    </div>
  );
};

export default VerifyPayment;
