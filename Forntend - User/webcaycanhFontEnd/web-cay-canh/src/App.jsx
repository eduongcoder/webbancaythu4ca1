import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import MenuComponent from './components/Menu.jsx';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Knowledge from './pages/Knowledge';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Payment from './pages/Payment';
import AddressInput from './pages/AddressInput';
import ThankYouPage from './pages/ThankYouPage';
import UserInfo from './pages/UserInfo';
import { CartProvider } from './context/CartContext';

import PaymentForm from './pages/PaymentForm.jsx';
const theme = createTheme({
  palette: {
    primary: {
      main: '#436d4d',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
    // useEffect(()=>{
    //   const fetchData = async () => {
    //     try {
    //       await ApiGetDat();
    //     } catch (error) {
    //       console.error('Error:', error.message);
    //     }
    //   };
  
    //   fetchData();
    // },[])
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <MenuComponent />
            <Banner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} /> {/* Make sure your ProductDetail component is handling this */}
              <Route path="/san-pham" element={<Products />} />
              <Route path="/kien-thuc" element={<Knowledge />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/nhapdiachi" element={<AddressInput />} />
              <Route path="/thanh-toan" element={<Payment />} />
              <Route path="/thanh-cong" element={<ThankYouPage />} />
              <Route path="/payment-form" element={<PaymentForm />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
