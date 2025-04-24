import React from 'react';
import { Box } from '@mui/material';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import banner1 from '../assets/img/banner/1.jpg';
import banner2 from '../assets/img/banner/2.jpg';
import banner3 from '../assets/img/banner/3.jpg'; 

const Banner = () => {
  const banners = [
    { id: 1, image: banner1, interval: 3000 },
    { id: 2, image: banner2, interval: 2000 },
    { id: 3, image: banner3, interval: 2000 },
  ];

  return (
    <Box sx={{ width: '100%', marginBottom: '2rem' }}>
      <Carousel>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id} interval={banner.interval}>
            <img
              className="d-block w-100"
              src={banner.image}
              alt={`Banner ${banner.id}`}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner; 