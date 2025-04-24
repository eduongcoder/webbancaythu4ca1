import React from "react";
import { Box, Typography, Paper, Avatar, Grid, Button } from "@mui/material";
import AddressInput from "./AddressInput";

const UserInfo = () => {
  // Lấy thông tin người dùng từ localStorage
  const userInfo = JSON.parse(localStorage.getItem("user"));

  // Kiểm tra nếu userInfo không tồn tại hoặc không có avatar
  if (!userInfo) {
    return (
      <Typography variant="body1" color="error" align="center">
        Không có dữ liệu người dùng.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 4,
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Card Container */}
      <Paper
        elevation={12}
        sx={{
          maxWidth: 800,
          margin: "auto",
          borderRadius: "16px",
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transform: "scale(1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {/* Avatar Section */}
        <Box sx={{ mb: 3 }}>
          <Avatar
            alt="User Avatar"
            src={userInfo.avatar || "https://via.placeholder.com/150"}
            sx={{
              width: 150,
              height: 150,
              border: "4px solid #1976d2",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              margin: "0 auto",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>

        {/* User Info */}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
        >
          {userInfo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {userInfo.email}
        </Typography>

        {userInfo.phone && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {userInfo.phone}
          </Typography>
        )}

        {userInfo.address && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {userInfo.address}
          </Typography>
        )}

        {/* Address Input Section */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}
          >
            Cập nhật địa chỉ của bạn:
          </Typography>
          <AddressInput />
        </Box>

        {/* Actions */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              padding: "12px 24px",
              borderRadius: "8px",
            }}
            onClick={() => navigate("/update-info")}
          >
            Cập nhật thông tin
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserInfo;
