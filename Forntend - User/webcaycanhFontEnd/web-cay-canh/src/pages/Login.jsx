import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Box, Container, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { PostApi, PostGoogleLogin } from '../Util/ApiConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZZgFicMjVbjI0gdp8iZI7UMcJE5Pa8LQ",
  authDomain: "baitap4nhom11.firebaseapp.com",
  projectId: "baitap4nhom11",
  storageBucket: "baitap4nhom11.firebasestorage.app",
  messagingSenderId: "445385168247",
  appId: "1:445385168247:web:748831fb68d8c956d2fd72",
  measurementId: "G-BKELEWNN0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await PostApi({
        path: '/user/login',  // Changed the endpoint to /user/login
        body: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.code === 0) {
        console.log('Login successful:', response.result);
        localStorage.setItem("user", response.result);
        navigate("userinfo");
      } else {
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email;
      console.log('User info:', user);

      const idToken = await user.getIdToken();
      console.log('Firebase ID token:', idToken);

      const decodedToken = jwtDecode(idToken);
      console.log('Decoded ID token:', decodedToken);

      const userapi = await PostGoogleLogin({ email: decodedToken.email, avatar: decodedToken.picture });
      console.log(userapi);
      localStorage.setItem('user', JSON.stringify(userapi));
      navigate("/userinfo");
      
    } catch (error) {
      console.error('Authentication failed:', error.message);
      
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('Tài khoản này đã được đăng ký bằng phương thức khác');
      } else {
        alert(`Đăng nhập thất bại: ${error.message}`);
      }
    }
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: '12px', boxShadow: '0px 6px 12px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1A73E8' }}>
            Đăng nhập
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ borderRadius: '8px' }}
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ borderRadius: '8px' }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, borderRadius: '8px', backgroundColor: '#1A73E8', '&:hover': { backgroundColor: '#1c56b8' } }}
            >
              Đăng nhập
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1A73E8' }}>
              Quên mật khẩu?
            </Link>
          </Box>

          <Divider sx={{ my: 3 }}>hoặc</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              size="large"
              sx={{
                borderRadius: '8px',
                color: '#db4437',
                borderColor: '#db4437',
                '&:hover': { backgroundColor: '#db4437', color: '#fff' }
              }}
              onClick={handleGoogleLogin}
            >
              Đăng nhập với Google
            </Button>

            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              fullWidth
              size="large"
              sx={{
                borderRadius: '8px',
                color: '#1877F2',
                borderColor: '#1877F2',
                '&:hover': { backgroundColor: '#1877F2', color: '#fff' }
              }}
              onClick={handleFacebookLogin}
            >
              Đăng nhập với Facebook
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Chưa có tài khoản?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: '#1A73E8' }}>
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
