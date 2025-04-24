import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ThankYouPage = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cảm ơn bạn đã mua hàng!
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Dưới đây là thông tin đơn hàng của bạn:
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Thông tin người thanh toán:</Typography>
          <Typography>Họ và tên: {userDetails.name}</Typography>
          <Typography>Số điện thoại: {userDetails.phone}</Typography>
          <Typography>Địa chỉ giao hàng: {userDetails.address}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
