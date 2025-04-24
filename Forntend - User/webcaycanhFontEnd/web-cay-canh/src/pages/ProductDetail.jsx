import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Lấy dữ liệu sản phẩm từ localStorage
  const productData = JSON.parse(localStorage.getItem("product"));
  const product = productData ? productData.find((el) => el.idProduct === id) : null;

  // Kiểm tra nếu không tìm thấy sản phẩm
  if (!product) {
    return <Typography variant="h6" color="error">Sản phẩm không tồn tại.</Typography>;
  }

  const handleAddToCart = () => {
    const price = product.price; // Lấy giá của sản phẩm

    const cartItem = {

      productId: product.idProduct,
      price: price,
      quantity: quantity,
      image: product.url,
      name:product.productName,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item.productId === cartItem.productId);

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          <Grid container spacing={4}>
            {/* Hình ảnh sản phẩm */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <img
                    src={product.url}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
            {/* Thông tin sản phẩm */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" color="primary" gutterBottom>
                {product.price}
              </Typography>

              {/* Số lượng */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography>Số lượng:</Typography>
                <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    inputProps={{ min: 1 }}
                    sx={{ width: 100 }}
                />
              </Box>

              {/* Nút hành động */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    size="large"
                    fullWidth
                    onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button variant="outlined" startIcon={<FavoriteIcon />} size="large">
                  Yêu thích
                </Button>
                <Button variant="outlined" startIcon={<ShareIcon />} size="large">
                  Chia sẻ
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
};

export default ProductDetail;
