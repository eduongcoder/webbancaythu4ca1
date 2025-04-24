import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import logo from '../assets/img/logo/rsz_logo-01.png';

const Navbar = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer',
            '&:hover': { color: '#436d4d' }
          }}>
            All
            <KeyboardArrowDownIcon />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            padding: '0.5rem',
            flex: 1
          }}>
            <InputBase
              placeholder="Tìm kiếm..."
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton type="button" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="#"><FacebookIcon /></Link>
              <Link to="#"><InstagramIcon /></Link>
              <Link to="#"><PhoneIcon /></Link>
            </Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={
                localStorage.getItem("user")?"/userinfo":"/login"
              }><PersonIcon /></Link>
              <Link to="/cart"><ShoppingBagIcon /></Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar; 