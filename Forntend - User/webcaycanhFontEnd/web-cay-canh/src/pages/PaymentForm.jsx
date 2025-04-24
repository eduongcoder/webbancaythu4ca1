import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
} from "@mui/material";

const GHN_API = "https://nhom11t4sangca1dotnet.onrender.com/api/GHN"; // Thay bằng API thật

const PaymentForm = () => {
  const location = useLocation();
  const [rows, setRows] = useState([
    { stt: "", productName: "", quantity: "", price: "" },
    { stt: "", productName: "", quantity: "", price: "" },
    { stt: "", productName: "", quantity: "", price: "" },
    { stt: "", productName: "", quantity: "", price: "" },
  ]);
  const [detail, setDetail] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const orderCode = queryParams.get("order_id");

  useEffect(() => {
    if (orderCode) {
      // Xóa cart khỏi localStorage
      localStorage.removeItem("cart");
  
      axios
        .post(`${GHN_API}/order-info`, { orderCode })
        .then((res) => {
          if (res.data && res.data.data) {
            setDetail(res.data.data);
          }
        })
        .catch((err) => console.error("Lỗi gọi API chi tiết:", err));
    }
  }, []);
  

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => {
      const price = parseInt(row.price) || 0;
      const quantity = parseInt(row.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976D2" }}
        >
          Phiếu Thanh Toán
        </Typography>

        {/* Thông tin đơn hàng từ API */}

        {/* Product rows */}
        {detail?.items?.map((item, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            sx={{ mb: 2, textAlign: "center" }}
          >
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Mã sản phẩm"
                value={item.item_order_code}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Tên sản phẩm"
                value={item.name}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Số lượng"
                value={item.quantity}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        ))}

        {/* Tổng tiền */}
        {detail && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="right"
                sx={{ fontWeight: "bold" }}
              >
                Tổng tiền:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", color: "#1976D2" }}
              >
                {Number(detail.cod_amount).toLocaleString()} VND
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentForm;
