import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Nutdn({ onLoginSuccess }) {
  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const fullName = `${decoded.family_name || ''} ${decoded.given_name || ''}`.trim();
      onLoginSuccess(fullName); // Gọi callback truyền từ App.js
    } catch (error) {
      console.error("Lỗi giải mã JWT:", error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Hoặc đăng nhập với Google</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Đăng nhập thất bại')}
      />
    </div>
  );
}

export default Nutdn;