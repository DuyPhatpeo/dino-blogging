import React from "react";
import styled from "styled-components";
import { Home } from "lucide-react";
import Layout from "@components/Layout/Layout";
import Button from "@components/Button/Button";

const NotFoundStyles = styled.div`
  min-height: calc(100vh - 120px); /* trừ header + footer */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;

  .code {
    font-size: 140px;
    font-weight: 800;
    color: ${(props) => props.theme.primary};
    line-height: 1;
    margin-bottom: 16px;
  }

  .message {
    font-size: 22px;
    color: ${(props) => props.theme.grayDark};
    margin-bottom: 32px;
  }

  .btn-home {
    background: ${(props) => props.theme.primary};
    color: #fff;
    border-radius: 8px;
    padding: 12px 24px;
    font-weight: 600;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: ${(props) => props.theme.secondary};
    }
  }
`;

const NotFoundPage = () => {
  return (
    <Layout>
      <NotFoundStyles>
        <h1 className="code">404</h1>
        <p className="message">
          Oops! The page you are looking for doesn’t exist.
        </p>
        <Button
          className="btn-home"
          onClick={() => (window.location.href = "/")}
        >
          <Home size={18} /> Back to Home
        </Button>
      </NotFoundStyles>
    </Layout>
  );
};

export default NotFoundPage;
