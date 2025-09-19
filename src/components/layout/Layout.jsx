import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
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

  .content.no-padding {
    padding: 0; /* 🚀 HomePage full-width */
  }
`;

const Layout = ({ children, noPadding = false }) => {
  return (
    <LayoutWrapper>
      <div className="header">
        <Header />
      </div>
      <div className={`content ${noPadding ? "no-padding" : ""}`}>
        {children}
      </div>
      <Footer />
    </LayoutWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  noPadding: PropTypes.bool,
};

export default Layout;
