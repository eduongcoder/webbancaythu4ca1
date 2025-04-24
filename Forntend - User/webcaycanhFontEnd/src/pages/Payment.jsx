import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, TextField, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import QRCode from 'react-qr-code';  // Thư viện để tạo mã QR
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cash');  // cash or qr
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0);

    const shippingFee = totalPrice > 500000 ? 0 : 30000; // Phí vận chuyển miễn phí cho đơn hàng trên 500.000₫
    return totalPrice + shippingFee;
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Lưu thông tin người thanh toán vào localStorage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    alert('Thanh toán thành công!');
    // Chuyển hướng người dùng tới trang xác nhận thanh toán
    navigate('/thanh-cong');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Thanh toán
        </Typography>

        {/* Thông tin giỏ hàng */}
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin giỏ hàng
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: 80, height: 80, borderRadius: '4px', marginRight: '16px' }}
                  />
                  <Box>
                    <Typography>{item.title}</Typography>
                    <Typography color="text.secondary">Kích thước: {item.option}</Typography>
                    <Typography color="primary">
                      {item.price} x {item.quantity} = {parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity} ₫
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Thông tin thanh toán
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Họ và tên" fullWidth variant="outlined" name="name" value={userDetails.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Số điện thoại" fullWidth variant="outlined" name="phone" value={userDetails.phone} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Địa chỉ giao hàng" fullWidth variant="outlined" name="address" value={userDetails.address} onChange={handleInputChange} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <FormControl>
            <FormLabel id="payment-method-label">Chọn phương thức thanh toán</FormLabel>
            <RadioGroup
              aria-labelledby="payment-method-label"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Tiền mặt khi nhận hàng" />
              <FormControlLabel value="qr" control={<Radio />} label="Quét mã QR" />
            </RadioGroup>
          </FormControl>

          {/* Hiển thị mã QR nếu chọn thanh toán qua QR */}
          {paymentMethod === 'qr' && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quét mã QR để thanh toán
              </Typography>
              <QRCode value="https://your-payment-gateway.com/qr-code" size={256} />
              <Typography sx={{ mt: 2 }}>Quét mã để thanh toán qua cổng thanh toán điện tử</Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Tạm tính</Typography>
            <Typography>{calculateTotal().toLocaleString()} ₫</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Phí vận chuyển</Typography>
            <Typography>{calculateTotal() > 500000 ? 'Miễn phí' : '30.000 ₫'}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Tổng cộng</Typography>
            <Typography variant="h6" color="primary">
              {calculateTotal().toLocaleString()} ₫
            </Typography>
          </Box>
          <Button variant="contained" fullWidth size="large" onClick={handleSubmit}>
            Thanh toán
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
