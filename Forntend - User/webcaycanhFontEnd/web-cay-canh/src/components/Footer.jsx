import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box sx={{ 
      bgcolor: '#436d4d',
      color: 'white',
      py: 6,
      mt: 8
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Totoro Garden
            </Typography>
            <Typography variant="body2" paragraph>
              Chuyên cung cấp các loại cây cảnh mini, sen đá – xương rồng, cây nội thất tại Hà Nội.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="none">
                Trang chủ
              </Link>
              <Link href="/san-pham" color="inherit" underline="none">
                Sản phẩm
              </Link>
              <Link href="/kien-thuc" color="inherit" underline="none">
                Kiến thức
              </Link>
              <Link href="/gioi-thieu" color="inherit" underline="none">
                Giới thiệu
              </Link>
              <Link href="/lien-he" color="inherit" underline="none">
                Liên hệ
              </Link>
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Danh mục
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/menu-1" color="inherit" underline="none">
                Cây cảnh văn phòng
              </Link>
              <Link href="/menu-2" color="inherit" underline="none">
                Tiểu cảnh terrarium
              </Link>
              <Link href="/menu-3" color="inherit" underline="none">
                Chậu cây cảnh
              </Link>
              <Link href="/menu-4" color="inherit" underline="none">
                Sen đá
              </Link>
              <Link href="/menu-5" color="inherit" underline="none">
                Xương rồng
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon />
                <Typography variant="body2">
                  123 Đường ABC, Quận 1, TP.HCM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon />
                <Typography variant="body2">
                  0123 456 789
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon />
                <Typography variant="body2">
                  contact@totoro.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="body2">
            © 2024 Totoro Garden. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 