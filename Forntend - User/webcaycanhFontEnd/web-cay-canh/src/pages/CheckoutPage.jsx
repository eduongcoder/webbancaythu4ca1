import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Grid, Paper, Button, Divider, TextField, RadioGroup, FormControlLabel, Radio
} from '@mui/material';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const shippingFee = 30000;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = total + shippingFee;

  const handlePlaceOrder = () => {
    alert('Đặt hàng thành công!');
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Thanh toán
      </Typography>

      {/* Địa chỉ nhận hàng */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Địa chỉ nhận hàng</Typography>
        <TextField fullWidth label="Họ và tên" sx={{ mb: 2 }} />
        <TextField fullWidth label="Số điện thoại" sx={{ mb: 2 }} />
        <TextField fullWidth label="Địa chỉ cụ thể" multiline rows={2} />
      </Paper>

      {/* Danh sách sản phẩm */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Sản phẩm</Typography>
        {cartItems.map((item, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <img src={item.image} alt={item.title} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={9}>
              <Typography>{item.title}</Typography>
              <Typography>Kích thước: {item.option}</Typography>
              <Typography>Số lượng: {item.quantity}</Typography>
              <Typography color="primary">
                {item.price.toLocaleString('vi-VN')} ₫
              </Typography>
            </Grid>
          </Grid>
        ))}
        <Divider sx={{ my: 2 }} />

        {/* Chi tiết tổng cộng */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography>Giá sản phẩm: {total.toLocaleString('vi-VN')} ₫</Typography>
          <Typography>Phí vận chuyển: {shippingFee.toLocaleString('vi-VN')} ₫</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Tổng cộng: {grandTotal.toLocaleString('vi-VN')} ₫
          </Typography>
        </Box>
      </Paper>

      {/* Phương thức thanh toán */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Phương thức thanh toán</Typography>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="cod" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
          <FormControlLabel value="bank" control={<Radio />} label="Chuyển khoản ngân hàng" />
        </RadioGroup>
      </Paper>

      {/* Nút đặt hàng */}
      <Box textAlign="right">
        <Button
          variant="contained"
          size="large"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
        >
          Đặt hàng
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
