import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import banner1 from '../assets/img/banner/1.jpg';
import banner2 from '../assets/img/banner/2.jpg';
import banner3 from '../assets/img/banner/3.jpg';
import banner4 from '../assets/img/banner/4.jpg';

const Knowledge = () => {
  const articles = [
    {
      id: 1,
      title: 'Cách chăm sóc cây cảnh trong nhà',
      image: banner1,
      excerpt: 'Hướng dẫn chi tiết cách chăm sóc các loại cây cảnh phổ biến trong nhà, giúp cây luôn xanh tươi và phát triển tốt.',
      date: '15/03/2024'
    },
    {
      id: 2,
      title: 'Top 10 cây cảnh phong thủy cho văn phòng',
      image: banner2,
      excerpt: 'Tổng hợp những loại cây cảnh phong thủy phù hợp nhất cho không gian văn phòng, giúp tăng cường năng lượng tích cực.',
      date: '10/03/2024'
    },
    {
      id: 3,
      title: 'Cách trồng và chăm sóc sen đá',
      image: banner3,
      excerpt: 'Hướng dẫn chi tiết cách trồng và chăm sóc sen đá, loại cây cảnh mini được nhiều người yêu thích.',
      date: '05/03/2024'
    },
    // Add more articles as needed
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 8 }}>
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative', 
          height: 300, 
          mb: 8,
          backgroundImage: `url(${banner4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white',
              position: 'relative',
              textAlign: 'center',
              fontWeight: 700
            }}
          >
            Kiến thức cây cảnh
          </Typography>
        </Box>

        {/* Search Section */}
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm bài viết..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                borderRadius: '8px'
              }
            }}
          />
        </Box>

        {/* Articles Grid */}
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card 
                component={Link} 
                to={`/knowledge/${article.id}`}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  textDecoration: 'none', 
                  borderRadius: '12px',
                  boxShadow: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={article.image}
                  alt={article.title}
                  sx={{
                    borderRadius: '12px 12px 0 0',
                    transition: '0.3s ease',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {article.excerpt}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.date}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    endIcon={<SearchIcon />}
                    sx={{
                      backgroundColor: '#1A73E8',
                      '&:hover': {
                        backgroundColor: '#1c56b8',
                      },
                      fontWeight: 'bold',
                    }}
                  >
                    Đọc thêm
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Categories */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Danh mục
          </Typography>
          <Grid container spacing={2}>
            {['Cây cảnh văn phòng', 'Cây phong thủy', 'Sen đá', 'Xương rồng', 'Cây nội thất'].map((category) => (
              <Grid item key={category}>
                <Button 
                  variant="outlined"
                  component={Link}
                  to={`/knowledge/category/${category.toLowerCase()}`}
                  sx={{
                    padding: '10px 20px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    }
                  }}
                >
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Knowledge;
