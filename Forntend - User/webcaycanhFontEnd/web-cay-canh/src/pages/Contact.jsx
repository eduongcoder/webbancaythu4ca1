import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu form đã có đầy đủ thông tin
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Gửi dữ liệu tới server qua API
    try {
      const response = await axios.post('https://your-backend-api.com/contact', formData);

      if (response.status === 200) {
        alert("Tin nhắn đã được gửi thành công!");
        // Bạn có thể reset form sau khi gửi thành công
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      alert("Đã xảy ra lỗi khi gửi tin nhắn.");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 8 }}>
        {/* Title */}
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Liên hệ
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={12} sx={{ p: 3, height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Thông tin liên hệ
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography sx={{ fontSize: '16px', color: '#555' }}>
                    123 Đường ABC, Quận 1, TP.HCM
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography sx={{ fontSize: '16px', color: '#555' }}>
                    0123 456 789
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography sx={{ fontSize: '16px', color: '#555' }}>
                    contact@totoro.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography sx={{ fontSize: '16px', color: '#555' }}>
                    Thứ 2 - Chủ nhật: 8:00 - 22:00
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={12} sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Gửi tin nhắn
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ tên"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiInputLabel-root': { fontWeight: 'bold' },
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiInputLabel-root': { fontWeight: 'bold' },
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiInputLabel-root': { fontWeight: 'bold' },
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Chủ đề"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiInputLabel-root': { fontWeight: 'bold' },
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nội dung"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiInputLabel-root': { fontWeight: 'bold' },
                        '& .MuiOutlinedInput-root': { borderRadius: '12px' },
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    width: '100%',
                    bgcolor: '#1A73E8',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    '&:hover': {
                      bgcolor: '#0f61c5',
                    },
                  }}
                >
                  Gửi tin nhắn
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;
