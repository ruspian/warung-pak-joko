import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });

        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        // Handle error if necessary
        navigate("/"); // Redirect to home page in case of error
      }
    };

    verifyPayment();
  }, [success, orderId, url, navigate]);

  return (
    <div className='verify'>
      <div className="spinner">
        {/* You can add spinner content here if needed */}
      </div>
    </div>
  );
};

export default Verify;