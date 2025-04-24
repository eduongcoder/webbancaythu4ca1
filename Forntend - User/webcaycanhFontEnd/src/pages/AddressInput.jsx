import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, TextField, Card, CardContent, Divider, Autocomplete } from '@mui/material';
import { CheckCircle } from '@mui/icons-material'; // Thêm icon

const mockCityData = {
  "Hà Nội": {
    districts: ["Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Cầu Giấy", "Thanh Xuân"],
    communes: {
      "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Cống Vị"],
      "Hoàn Kiếm": ["Hàng Bạc", "Hàng Buồm", "Hàng Đào"],
      "Tây Hồ": ["Quảng An", "Phú Thượng", "Tây Hồ"],
      "Cầu Giấy": ["Dịch Vọng", "Yên Hòa", "Mai Dịch"],
      "Thanh Xuân": ["Khương Đình", "Hạ Đình", "Thanh Xuân Bắc"]
    }
  },
  "TP Hồ Chí Minh": {
    districts: ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"],
    communes: {
      "Quận 1": ["Bến Nghé", "Đa Kao", "Tân Định"],
      "Quận 2": ["Thảo Điền", "An Phú", "Bình An"],
      "Quận 3": ["Phường 1", "Phường 2", "Phường 3"],
      "Quận 4": ["Phường 12", "Phường 13", "Phường 14"],
      "Quận 5": ["Phường 1", "Phường 2", "Phường 3"]
    }
  },
  // Thêm dữ liệu cho các thành phố khác nếu cần
};
function getCityNames(cityData) {
  return Object.keys(cityData);
}
const AddressInput = () => {
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
  const [savedAddress, setSavedAddress] = useState('');

  // Hàm gọi dữ liệu từ mock (hoặc API) khi người dùng nhập thành phố
  const getCityData = (cityName) => {
    return mockCityData[cityName] || { districts: [], communes: {} };
  };

  useEffect(() => {
    // Khi thay đổi thành phố, reset quận và xã
    if (city) {
      setDistrict('');
      setCommune('');
    }
  }, [city]);

  const handleCityChange = (e, newValue) => {
    setCity(newValue);
  };

  const handleDistrictChange = (e, newValue) => {
    setDistrict(newValue);
    setCommune('');
  };

  const handleCommuneChange = (e, newValue) => {
    setCommune(newValue);
  };

  const handleSave = () => {
    if (!city || !district || !commune) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const fullAddress = `${commune}, ${district}, TP ${city}`;
    setSavedAddress(fullAddress);
    alert(`Địa chỉ đã lưu: ${fullAddress}`);
  };

  const cityInfo = getCityData(city);

  return (
    <Container maxWidth="sm" sx={{ padding: 4, backgroundColor: '#FAFAFA', borderRadius: 2, boxShadow: 8, marginTop: 5 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4, fontWeight: 700, color: '#1A73E8' }}>
        Chọn địa chỉ của bạn
      </Typography>

      <Card sx={{ backgroundColor: '#fff', borderRadius: 3, boxShadow: 5, padding: 3, transition: '0.3s', '&:hover': { boxShadow: 8 } }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Thành phố */}
            {/* <Grid item xs={12}>
              <TextField
                label="Thành phố"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => handleCityChange(e, e.target.value)}
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </Grid>  */}
            <Grid item xs={12}>
                <Autocomplete
                  value={city}
                  onChange={handleCityChange}
                  options={getCityNames(mockCityData)}
                  renderInput={(params) => <TextField {...params} label="Thành Phố" variant="outlined" fullWidth sx={{ backgroundColor: '#f5f5f5' }} />}
                />
              </Grid>
            {/* Quận/Huyện */}
            {city && cityInfo.districts.length > 0 && (
              <Grid item xs={12}>
                <Autocomplete
                  value={district}
                  onChange={handleDistrictChange}
                  options={cityInfo.districts}
                  renderInput={(params) => <TextField {...params} label="Quận/Huyện" variant="outlined" fullWidth sx={{ backgroundColor: '#f5f5f5' }} />}
                />
              </Grid>
            )}

            {/* Xã */}
            {district && cityInfo.communes[district] && cityInfo.communes[district].length > 0 && (
              <Grid item xs={12}>
                <Autocomplete
                  value={commune}
                  onChange={handleCommuneChange}
                  options={cityInfo.communes[district]}
                  renderInput={(params) => <TextField {...params} label="Xã" variant="outlined" fullWidth sx={{ backgroundColor: '#f5f5f5' }} />}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>

        <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            padding: 1.5,
            fontWeight: 'bold',
            backgroundColor: '#1A73E8',
            '&:hover': { backgroundColor: '#0c59c3' },
          }}
          onClick={handleSave}
          disabled={!city || !district || !commune}
        >
          Lưu địa chỉ
        </Button>
      </Card>

      {savedAddress && (
        <Box sx={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 500, color: '#4caf50', marginTop: 3 }}>
          <CheckCircle sx={{ fontSize: 30, color: '#4caf50' }} />
          <Typography sx={{ marginTop: 1 }}>
            Địa chỉ đã lưu: <strong>{savedAddress}</strong>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AddressInput;
