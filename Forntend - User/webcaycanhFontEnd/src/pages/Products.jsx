import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, MenuItem, Pagination } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import product1 from '../assets/img/Cay anh van phong/1.jpg';
import product2 from '../assets/img/Cay anh van phong/2.jpg';
import product3 from '../assets/img/Cay anh van phong/3.jpg';
import product4 from '../assets/img/Cay anh van phong/4.jpg';
import { GetApi } from '../Util/ApiConfig';

const Products = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [product,setproduct]=useState([]||undefined);

  /**
   *  [
    {
      "idProduct": "0b1662af-542f-485a-995f-8f75b3bf7890",
      "productName": "ab",
      "price": "20",
      "url": "https://res.cloudinary.com/dg8hjh2c7/image/upload/b2aa985e-7fd9-40c8-a238-dfba1380638a_Screenshot_2025-01-13_132046.png"
    },
    {
      "idProduct": "9045feec-8893-463b-b269-aa1710a9c429",
      "productName": "a",
      "price": "20",
      "url": "https://res.cloudinary.com/dg8hjh2c7/image/upload/bdf7af48-cd07-48ba-a3ce-31515717f66c_Screenshot_2025-01-13_132046.png"
    },
    {
      "idProduct": "f1cb2c88-1664-43d8-a16c-f5014ccc60d4",
      "productName": "ab",
      "price": "20",
      "url": "https://res.cloudinary.com/dg8hjh2c7/image/upload/015ff0fa-f00f-48f4-9923-7544dfcaa5c3_Screenshot_2025-01-13_132046.png"
    }
  ]
   */
  useEffect(() => {
    // Kiểm tra xem sản phẩm đã có trong localStorage chưa
    const storedProducts = localStorage.getItem("product");

    if (storedProducts) {
      // Nếu có, lấy dữ liệu từ localStorage và set vào state
      setproduct(JSON.parse(storedProducts));
    } else {
      // Nếu không có, gọi API và lưu vào localStorage
      const fetchProducts = async () => {
        try {
          const data = await GetApi({ path: "/product/getAll" });
          setproduct(data); // Cập nhật state với dữ liệu API
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
        <Typography variant="h4" component="h1" gutterBottom>
          SẢN PHẨM
        </Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
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
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={prod.url}
                  alt={prod.productName}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {prod.productName}
                  </Typography>
                  {/* {product.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                  )} */}
                  {prod.price && (
                    <Typography variant="h6" color="primary">
                      {prod.price}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
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
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Products; 