// ImageSlider.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';

const images = [
  'https://placekitten.com/800/400',
  'https://placekitten.com/801/400',
  'https://placekitten.com/802/400',
  // Add more image URLs as needed
];

const SliderComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Use useEffect to automatically transition to the next image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <Container>
      <Typography variant="h5">Image Slider</Typography>
      <img
        src={images[currentImageIndex]}
        alt={`slide-${currentImageIndex}`}
        style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
      />
      <div>
        <Button onClick={goToPreviousImage} variant="contained">
          Previous
        </Button>
        <Button onClick={goToNextImage} variant="contained" style={{ marginLeft: '10px' }}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default SliderComponent;
