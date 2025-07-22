import React, { useState, useEffect } from 'react';
import './Marquee.css';

const Marquee = ({ state }) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state) {
      setLoading(true);
      fetch(`http://localhost:5000/mandi-prices?limit=20&state=${encodeURIComponent(state)}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.records) {
            setPrices(data.records);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching prices:', error);
          setLoading(false);
        });
    }
  }, [state]);

  return (
    <div className="marquee-container">
      <div className="marquee-text">
        {loading ? (
          <span>Loading crop prices...</span>
        ) : prices.length > 0 ? (
          prices.map((record, index) => (
            <span key={index}>
              <croper>{record.commodity}</croper>: ₹{record.modal_price} <mandi>({record.market})</mandi>
            </span>
          ))
        ) : (
          <span>Select a state to see crop prices.</span>
        )}
      </div>
    </div>
  );
};

export default Marquee;
