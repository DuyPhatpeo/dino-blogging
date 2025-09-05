import LoadingSpinner from "@components/loading/LoadingSpinner";
import React from "react";

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4ff, #30737cff)",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <LoadingSpinner size="60px" borderSize="6px" />
      <p style={{ fontSize: "18px", color: "#333" }}>Đang tải dữ liệu...</p>
    </div>
  );
};

export default HomePage;
