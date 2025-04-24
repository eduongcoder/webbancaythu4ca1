import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import banner4 from '../assets/img/banner/4.jpg';
import product1 from '../assets/img/product-new/1.jpg';
import product2 from '../assets/img/product-new/2.jpg';
import product3 from '../assets/img/product-new/3.jpg';
import product5 from '../assets/img/product-new/5.jpg';

const Home = () => {
  const newProducts = [
    {
      id: 1,
      image: product1,
      title: 'Cây string of heart(cây dây tim tím, vảy ốc tím, chuỗi tím,...)',
      description: ''
    },
    {
      id: 2,
      image: product2,
      title: 'Cây đuôi chồn (trúc đuôi chồn,...)',
      description: 'Lí do chúng có cái tên đặc biệt như vậy là bởi hình dáng cây. Các nhánh cây mọc dài vươn thẳng và có nhiều lá nhỏ hình kim, mọc dày, bông xù như đuôi của những con chồn.'
    },
    {
      id: 3,
      image: product3,
      title: 'Cây thường xuân',
      description: ''
    },
    {
      id: 4,
      image: product5,
      title: 'Cây đa búp đỏ',
      description: 'Cây đa từ xưa đến nay luôn là biểu tượng tốt đẹp tượng trưng cho làng quê Việt Nam. Nhưng đó là những cây cổ thụ, rất to lớn nên không tiện trồng trong nhà. Nhiều năm trở lại nhờ tiến bộ kỹ thuật các nhà khoa học đã cho ra những giống đa mới kích thước nhỏ với màu sắc sặc sỡ có tên là đa búp đỏ. Loại cây này đã được dưỡng nên rất dễ chăm sóc và có tính thẩm mỹ cao.'
    }
  ];

  return (
    <Container maxWidth="xl">
      {/* About Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          CHÚNG TÔI LÀ TOTORO GARDEN
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <img 
              src={banner4}
              alt="Totoro Garden" 
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography paragraph>
              <strong>Totoro Garden</strong> – Uy tín vươn xa là thương hiệu trong lĩnh vực cây cảnh mini, sen đá – xương rồng, cây nội thất tại Hà Nội. Ra đời từ năm 2017, tới nay <strong>Totoro Garden</strong> đã phục vụ 30.000+ khách hàng. Triết lý kinh doanh của Chúng tôi là "Lan tỏa sức sống" và "Là bạn đồng hành" với khách hàng. Chúng tôi coi công việc của mình luôn mạng lại màu xanh tươi cho cuộc sống và kiến tạo giá trị, sức sống cho mọi không gian mà chúng tôi bước tới. Sự tin tưởng của Quý khách hàng trong suốt thời gian qua là niềm tự hào và là động lực để <strong>Totoro Garden</strong> tiếp tục lớn mạnh và phát triển.
            </Typography>
            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}
              component={Link}
              to="/gioi-thieu"
            >
              XEM CHI TIẾT
            </Button>
          </Box>
        </Box>
      </Box>

      {/* New Products Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          SẢN PHẨM MỚI
        </Typography>
        <Grid container spacing={4}>
          {newProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                component={Link} 
                to={`/product/${product.id}`}
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
                  image={product.image}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.title}
                  </Typography>
                  {product.description && (
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                  >
                    ĐỌC TIẾP
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForwardIcon />}
            component={Link}
            to="/san-pham"
          >
            XEM TẤT CẢ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 