import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import banner4 from '../assets/img/banner/4.jpg';

const About = () => {
  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Giao hàng nhanh chóng',
      description: 'Chúng tôi cam kết giao hàng trong vòng 24h cho khu vực nội thành và 48h cho các tỉnh lân cận.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Thanh toán an toàn',
      description: 'Hỗ trợ nhiều phương thức thanh toán khác nhau, đảm bảo an toàn và tiện lợi cho khách hàng.'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ tư vấn viên luôn sẵn sàng hỗ trợ khách hàng mọi lúc mọi nơi.'
    },
    {
      icon: <EmojiNatureIcon sx={{ fontSize: 40 }} />,
      title: 'Sản phẩm chất lượng',
      description: 'Tất cả sản phẩm đều được kiểm tra kỹ lưỡng trước khi giao đến tay khách hàng.'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 8 }}>
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative', 
          height: 400, 
          mb: 8,
          backgroundImage: `url(${banner4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '8px',
          }
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white',
              position: 'relative',
              textAlign: 'center',
              fontSize: '3rem',
              fontWeight: 'bold',
            }}
          >
            Về chúng tôi
          </Typography>
        </Box>

        {/* About Content */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Totoro Garden - Lan tỏa sức sống
            </Typography>
            <Typography paragraph>
              Totoro Garden – Uy tín vươn xa là thương hiệu trong lĩnh vực cây cảnh mini, sen đá – xương rồng, cây nội thất tại Hà Nội. Ra đời từ năm 2017, tới nay Totoro Garden đã phục vụ 30.000+ khách hàng.
            </Typography>
            <Typography paragraph>
              Triết lý kinh doanh của chúng tôi là "Lan tỏa sức sống" và "Là bạn đồng hành" với khách hàng. Chúng tôi coi công việc của mình luôn mang lại màu xanh tươi cho cuộc sống và kiến tạo giá trị, sức sống cho mọi không gian mà chúng tôi bước tới.
            </Typography>
            <Typography>
              Sự tin tưởng của Quý khách hàng trong suốt thời gian qua là niềm tự hào và là động lực để Totoro Garden tiếp tục lớn mạnh và phát triển.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img 
              src={banner4}
              alt="Totoro Garden" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
              }}
            />
          </Grid>
        </Grid>

        {/* Features */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Tại sao chọn chúng tôi?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={6} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '8px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
