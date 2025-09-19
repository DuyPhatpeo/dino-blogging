import React from "react";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import logo from "@assets/logo.png";
import { useNavigate } from "react-router-dom";

const LayoutAuthStyles = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #f0f4ff, #e0f7fa);

  .main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
  }

  .wrapper {
    width: 100%;
    max-width: 520px;
    text-align: center;
  }

  .logo {
    display: block;
    margin: 0 auto 20px;
    width: 90px;
  }

  .back-home {
    position: absolute;
    top: 20px;
    right: 20px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .footer {
    text-align: center;
    padding: 20px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray};
    background: rgba(255, 255, 255, 0.6);
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

const LayoutAuth = ({ children }) => {
  const navigate = useNavigate();
  return (
    <LayoutAuthStyles>
      <div className="main">
        <div className="back-home" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </div>

        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
          {children}
        </div>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} Dino Blog. All rights reserved.
      </footer>
    </LayoutAuthStyles>
  );
};

export default LayoutAuth;
