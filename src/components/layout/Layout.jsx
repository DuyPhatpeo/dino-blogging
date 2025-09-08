import React from "react";
import styled from "styled-components";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  font-family: "Inter", sans-serif;

  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .content {
    flex: 1;
    padding: 24px;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <div className="header">
        <Header />
      </div>
      <div className="content">{children}</div>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
