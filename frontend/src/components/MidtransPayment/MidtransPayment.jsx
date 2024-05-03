import React, { useEffect } from 'react';

const MidtransPayment = ({ transactionToken, sessionUrl }) => {

  useEffect(() => {
    const loadMidtransScript = async () => {
      if (!window.snap || !window.snap.pay) {
        const midtransScript = document.createElement('script');
        midtransScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        midtransScript.setAttribute('data-client-key', import.meta.env.REACT_PUBLIC_CLIENT);
        midtransScript.onload = () => {
          initializeMidtransPayment();
        };
        document.head.appendChild(midtransScript);
      } else {
        initializeMidtransPayment();
      }
    };

    const initializeMidtransPayment = () => {
      window.snap.pay(transactionToken, {
        // onSuccess: function() {
        //   window.location.replace(sessionUrl); // Alihkan ke URL sukses setelah pembayaran berhasil
        // },
        // onError: function() {
        //   window.location.replace(sessionUrl); // Alihkan ke URL sukses setelah pembayaran gagal
        // },
        onSuccess: function () {
          window.location.href = sessionUrl.success_url; // Alihkan ke URL sukses setelah pembayaran berhasil
        },
        onPending: function () {
          window.location.href = sessionUrl.error_url; // Alihkan ke URL gagal setelah pembayaran gagal
        },
        onError: function (result) {
          console.error('Error during payment:', result);
          // Tangani kesalahan pembayaran, misalnya tampilkan pesan kesalahan kepada pengguna
        },
        onClose: function (result) {
          console.error('Error during payment:', result);
          // Tangani kesalahan pembayaran, misalnya tampilkan pesan kesalahan kepada pengguna
        }
      });
    };

    loadMidtransScript();
  }, [transactionToken, sessionUrl]);


  return (
    <div className="midtrans-payment">
      <div className="spinner">

      </div>
    </div>
  );
}

export default MidtransPayment;
