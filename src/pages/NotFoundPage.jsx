import React from "react";
import styled from "styled-components";
import { Home } from "lucide-react";
import Button from "@components/button/Button";

const NotFoundStyles = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  text-align: center;
  padding: 40px;

  .code {
    font-size: 140px;
    font-weight: 800;
    color: #23939f;
    line-height: 1;
    margin-bottom: 16px;
  }

  .message {
    font-size: 22px;
    color: #444;
    margin-bottom: 32px;
  }

  button {
    background: #23939f;
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
  }

  button:hover {
    background: #1b6d75;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundStyles>
      <h1 className="code">404</h1>
      <p className="message">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Button onClick={() => (window.location.href = "/")}>
        <Home size={18} /> Back to Home
      </Button>
    </NotFoundStyles>
  );
};

export default NotFoundPage;
