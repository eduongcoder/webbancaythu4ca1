import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, MenuItem, Pagination } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { GetApi } from '../Util/ApiConfig';

const Products = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([] || undefined);

  useEffect(() => {
    // Kiểm tra xem sản phẩm đã có trong localStorage chưa
    const storedProducts = localStorage.getItem("product");

    if (!storedProducts) {
      // Nếu có, lấy dữ liệu từ localStorage và set vào state
      setProduct(JSON.parse(storedProducts));
    } else {
      // Nếu không có, gọi API và lưu vào localStorage
      const fetchProducts = async () => {
        try {
          const data = await GetApi({ path: "/product/getAll" });
          setProduct(data); // Cập nhật state với dữ liệu API
          localStorage.setItem("product", JSON.stringify(data)); // Lưu vào localStorage
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, []);

  const categories = [
    'Tất cả sản phẩm',
    'Cây văn phòng',
    'Tiểu cảnh terrarium',
    'Chậu cây cảnh',
    'Sen đá',
    'Xương rồng',
    'Quà tặng doanh nghiệp',
    'Cây nội thất'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1A73E8', textAlign: 'center' }}>
          SẢN PHẨM
        </Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
          <TextField
            select
            label="Sắp xếp theo"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="newest">Mới nhất</MenuItem>
            <MenuItem value="price_asc">Giá tăng dần</MenuItem>
            <MenuItem value="price_desc">Giá giảm dần</MenuItem>
          </TextField>

          <TextField
            select
            label="Danh mục"
            defaultValue="all"
            sx={{ minWidth: 200 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category.toLowerCase()}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {product.map((prod) => (
            <Grid item xs={12} sm={6} md={3} key={prod.idProduct}>
              <Card
                component={Link}
                to={`/product/${prod.idProduct}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 10,
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={prod.url}
                  alt={prod.productName}
                  sx={{ borderRadius: '12px 12px 0 0' }}
                />
                <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
                  <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                    {prod.productName}
                  </Typography>
                  {prod.price && (
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      {prod.price}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      backgroundColor: '#1A73E8',
                      '&:hover': { backgroundColor: '#1c56b8' },
                      fontWeight: 'bold',
                      textTransform: 'none',
                    }}
                  >
                    {prod.price ? 'LỰA CHỌN CÁC TUỲ CHỌN' : 'ĐỌC TIẾP'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={10}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '50%',
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
