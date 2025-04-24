import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Box, Container, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { PostApi, PostGoogleLogin } from '../Util/ApiConfig'; // Assuming you have a function for API requests
// import { GoogleLogin } from 'react-google-login'; // Using the Google login component
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle login logic here, assuming this endpoint is for login
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
        // Handle successful login (e.g., redirect, store token, etc.)
      } else {
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

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
  
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Thêm scope nếu cần
      provider.addScope('profile');
      provider.addScope('email');
      
      // Sử dụng signInWithPopup thay vì xử lý token thủ công
      const result = await signInWithPopup(auth, provider);
      
      // Lấy thông tin người dùng
      const user = result.user;
      const userEmail = user.email; // <-- Đây là email cần lấy
      console.log('User info:', user);
  
      // Lấy Firebase ID token (để gửi đến backend nếu cần)
      const idToken = await user.getIdToken();
      console.log('Firebase ID token:', idToken);
  
      // Giải mã token và in ra các giá trị
      const decodedToken = jwtDecode(idToken); // Sử dụng `decode` thay vì `jwt_decode`
      console.log('Decoded ID token:', decodedToken);
  
      // Nếu bạn muốn in chi tiết từng giá trị trong token
      console.log('UID:', decodedToken.uid);
      console.log('Email:', decodedToken.email);
      console.log('Name:', decodedToken.name);
      console.log('Picture:', decodedToken.picture);
      await PostGoogleLogin({email:decodedToken.email,avatar:decodedToken.picture});
      // Lưu thông tin đăng nhập
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }));
      
    } catch (error) {
      console.error('Authentication failed:', error.message);
      
      // Xử lý lỗi cụ thể
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('Tài khoản này đã được đăng ký bằng phương thức khác');
      } else {
        alert(`Đăng nhập thất bại: ${error.message}`);
      }
    }
  };


  const handleFacebookLogin = () => {
    // Integrate Facebook login here
    console.log('Facebook login clicked');
    // Redirect to your Facebook login flow or handle the OAuth logic
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
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
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              Đăng nhập
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'primary.main' }}>
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
                  onClick={handleGoogleLogin} 
                  // disabled={renderProps.disabled}
                >
                  Đăng nhập với Google
                </Button>
              
            
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              fullWidth
              size="large"
              onClick={handleFacebookLogin}  // Trigger Facebook login here
            >
              Đăng nhập với Facebook
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Chưa có tài khoản?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: 'primary.main' }}>
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
