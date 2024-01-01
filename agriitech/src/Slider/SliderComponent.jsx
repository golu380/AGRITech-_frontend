// SliderComponent.js

import React, { useState, useEffect } from 'react';
// import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import data from '../Slider/sliderData'

import Carousel from 'react-bootstrap/Carousel';


const SliderComponent = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
setSlides(data);
  }, []); // Empty dependency array to run the effect only once (on mount)

  const settings = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  return (
    <Slider {...settings}>
    {data.map((item) => (
      <div key={item.id}>
        {/* Customize the content of each slide based on your data */}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </Slider>
  );
}
}

export default SliderComponent