import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Menu, MenuItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { title: 'CÂY CẢNH VĂN PHÒNG & PHONG THUỶ', path: '/menu-1' },
    { title: 'TIỂU CẢNH TERARIUM', path: '/menu-2' },
    { title: 'CHẬU CÂY CẢNH', path: '/menu-3' },
    { title: 'SEN ĐÁ', path: '/menu-4' },
    { title: 'XƯƠNG RỒNG', path: '/menu-5' },
    { title: 'QUÀ TẶNG DOANH NGHIỆP', path: '/menu-6' },
    { title: 'CÂY NỘI THẤT', path: '/menu-7' },
  ];

  const mainMenuItems = [
    { title: 'TRANG CHỦ', path: '/' },
    { title: 'SẢN PHẨM', path: '/san-pham' },
    { title: 'KIẾN THỨC CÂY CẢNH', path: '/kien-thuc' },
    { title: 'GIỚI THIỆU', path: '/gioi-thieu' },
    { title: 'LIÊN HỆ', path: '/lien-he' },
  ];

  return (
    <Box sx={{ 
      backgroundColor: '#436d4d',
      padding: '0.5rem 0'
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        gap: '2rem'
      }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <MenuIcon />
            Danh mục sản phẩm
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 300,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }
            }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.path} component={Link} to={item.path} onClick={handleClose}>
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {mainMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {item.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default MenuComponent; 