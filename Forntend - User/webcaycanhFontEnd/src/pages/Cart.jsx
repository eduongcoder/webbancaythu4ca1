import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, TextField, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import product1 from '../assets/img/Cay anh van phong/1.jpg';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [
      {
        id: 1,
        title: 'Cây string of heart',
        price: '90.000 ₫',
        quantity: 1,
        image: product1,
        option: 'Nhỏ'
      },
      // Add more items as needed
    ];
  });

  // Cập nhật giỏ hàng khi thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0);

    // Phí vận chuyển, có thể thay đổi theo tổng giá trị đơn hàng
    const shippingFee = totalPrice > 500000 ? 0 : 30000; // Phí vận chuyển miễn phí cho đơn hàng trên 500.000₫
    return totalPrice + shippingFee;
  };

  const handlePayment = () => {
    navigate('/thanh-toan');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Giỏ hàng
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingCartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Giỏ hàng trống
            </Typography>
            <Button variant="contained" href="/san-pham">
              Tiếp tục mua sắm
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                    <Grid item xs={3}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography color="text.secondary">Kích thước: {item.option}</Typography>
                          <Typography color="primary" sx={{ mt: 1 }}>
                            {item.price}
                          </Typography>
                        </Box>
                        <IconButton onClick={() => handleRemoveItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          type="number"
                          inputProps={{ min: 1 }}
                          sx={{ width: 60, mx: 1 }}
                          onChange={(e) => {
                            const value = Math.max(1, parseInt(e.target.value) || 1);
                            setCartItems(items =>
                              items.map(i =>
                                i.id === item.id ? { ...i, quantity: value } : i
                              )
                            );
                          }}
                        />
                        <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Tổng đơn hàng
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Tạm tính</Typography>
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
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handlePayment}
                >
                  Tiến hành thanh toán
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
