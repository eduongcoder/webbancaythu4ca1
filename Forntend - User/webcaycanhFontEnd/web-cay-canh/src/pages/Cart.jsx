import React, { useState } from "react";
import axios from "axios"; // ✅ dòng này rất quan trọng
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { PostApiPayment } from "../Util/ApiConfig.jsx";

const Cart = () => {
  const navigate = useNavigate();
  const cartProduct = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const [cartItems, setCartItems] = useState(cartProduct);
  const handleQuantityChange = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => {
      const updatedItems = items.filter((item) => item.productId != id);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };
  
  const ship = localStorage.getItem("total")
    ? localStorage.getItem("total")
    : 0;
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));

      return total + price * item.quantity;
    }, 0);
  };
  const handleSubmit = async () => {
    const totalPrice = calculateTotal();
    const shipFee = parseInt(localStorage.getItem("total")) || 0;
    const totalAmount = totalPrice + shipFee;
  
    const cappedAmount = totalAmount;
  
    const toPhone = localStorage.getItem("phoneNumber");
    const toAddress = localStorage.getItem("city");
    const toWardCode = localStorage.getItem("wardCode");
    const toDistrictId = parseInt(localStorage.getItem("districtID"));
  
    const items = cartItems.map((item) => ({
      name: item.name,
      code: "SP001",
      quantity: item.quantity,
      price: parseInt(String(item.price).replace(/[^0-9]/g, "")), // đảm bảo item.price là string
      length: 12,
      width: 12,
      height: 12,
      weight: 1200,
      category: {
        level1: "Hàng hóa",
      },
    }));
  
    const payload = {
      zaloPayRequest: {
        amount: cappedAmount + "",
        orderInfo: "đơn hàng",
      },
      shippingOrderRequest: {
        payment_type_id: 2,
        note: "Giao hàng nhanh - Test API",
        required_note: "KHONGCHOXEMHANG",
        from_name: "Nhóm 11 test",
        from_phone: "0987654321",
        from_address: "1764",
        from_ward_name: "Xã Nhơn Đức",
        from_district_name: "Huyện Nhà Bè",
        from_province_name: "TP. Hồ Chí Minh",
        return_phone: "0332190444",
        return_address: "39 Nguyễn Thị Thập",
        return_district_id: null,
        return_ward_code: "",
        client_order_code: "GHN123456789",
        to_name: "Khách hàng Test",
        to_phone: toPhone,
        to_address: toAddress,
        to_ward_code: toWardCode,
        to_district_id: toDistrictId,
        cod_amount: totalAmount,
        content: "Test đơn hàng API GHN",
        weight: 500,
        length: 20,
        width: 15,
        height: 10,
        insurance_value: 1000000,
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        pick_shift: [2],
        items: items,
      },
    };
  
    try {
      const response = await axios.post(
        "https://nhom11t4sangca1.onrender.com/api/payment/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { data } = response;
      console.log("Phản hồi từ API:", data);
      window.location.href = data.trim();
    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
      alert("Thanh toán thất bại!");
    }
    
  };
  
  

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Giỏ hàng
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <ShoppingCartIcon
              sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Giỏ hàng trống
            </Typography>
            <Button variant="contained" href="/san-pham">
              Tiếp tục mua sắm
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ py: 2 }}
                  >
                    <Grid item xs={3}>
                      <img
                        src={
                          item.image ||
                          "https://thuthuatphanmem.vn/cay-canh-dep-tong-hop-hinh-anh-cay-canh-dep-nhat/"
                        }
                        alt={item.name || "Product Name"}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "4px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography color="primary" sx={{ mt: 1 }}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 2 }}
                      >
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(item.productId, -1)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          type="number"
                          inputProps={{ min: 1 }}
                          sx={{ width: 60, mx: 1 }}
                          onChange={(e) => {
                            const value = Math.max(
                              1,
                              parseInt(e.target.value) || 1
                            );
                            setCartItems((items) =>
                              items.map((i) =>
                                i.productId === item.productId
                                  ? { ...i, quantity: value }
                                  : i
                              )
                            );
                          }}
                        />
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(item.productId, 1)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Tổng đơn hàng
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Tạm tính</Typography>
                  <Typography>{calculateTotal().toLocaleString()} ₫</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Phí vận chuyển</Typography>
                  <Typography>
                    {localStorage.getItem("total") ? (
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(localStorage.getItem("total"))
                    ) : (
                      <Link
                        to="/userinfo"
                        style={{ textDecoration: "none", color: "#1976d2" }}
                      >
                        Cập nhật địa chỉ &gt;&gt;
                      </Link>
                    )}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Tổng cộng</Typography>
                  <Typography variant="h6" color="primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(parseInt(calculateTotal()) + parseInt(ship))}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSubmit}
                >
                  Tiến hành thanh toán
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
