import { Button } from "@components/button";
import React from "react";
import styled from "styled-components";

const DashboardHeaderStyles = styled.div`
  background-color: #fff;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .header-button {
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0 20px;
    height: 48px;
    border-radius: 12px;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
  }

  .header-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.2s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const DashboardHeader = () => {
  return (
    <DashboardHeaderStyles>
      <Button to="/dashboard" className="header-button">
        Write New Post
      </Button>
      <div className="header-avatar">
        <img
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=3270&q=80"
          alt="User Avatar"
        />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
