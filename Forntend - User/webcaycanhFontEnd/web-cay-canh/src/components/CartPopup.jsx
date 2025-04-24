import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPopup = ({ anchorEl, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!anchorEl) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        width: '350px',
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 1,
        zIndex: 1000,
        maxHeight: '500px',
        overflowY: 'auto',
      }}
      onMouseEnter={e => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Giỏ hàng ({cartItems.length})
        </Typography>
        {cartItems.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            Giỏ hàng trống
          </Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Box key={item.id}>
                <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="body2" color="primary">
                      {item.price.toLocaleString()} ₫
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: 'auto' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tổng cộng:</Typography>
                <Typography color="primary" fontWeight="bold">
                  {calculateTotal().toLocaleString()} ₫
                </Typography>
              </Box>
              <Box
                component="button"
                onClick={() => navigate('/cart')}
                sx={{
                  width: '100%',
                  py: 1,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  border: 'none',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Xem giỏ hàng
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CartPopup; 