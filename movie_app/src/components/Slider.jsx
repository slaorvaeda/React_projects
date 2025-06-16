import React from 'react';
import { Link } from 'react-router-dom';
import './Slider.css';

const Slider = ({ title, items }) => {
  return (
    <div className="slider-section">
      <h2>{title}</h2>
      <div className="slider-container">
        {items.map(item => (
          <div key={item.id} className="slider-item">
            <Link to={title === "Movies" ? `/movie/${item.id}` : `/tv/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
