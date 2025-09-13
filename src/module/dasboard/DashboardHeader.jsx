import React from "react";
import styled from "styled-components";
import Button from "@components/button/Button";
import { useNavigate } from "react-router-dom";

const DashboardHeaderStyles = styled.header`
  background-color: #fff;
  padding: 12px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .header-button {
    font-weight: 500;
    font-size: 0.95rem;
    height: 44px;
    padding: 0 20px;
    border-radius: 10px;
    display: flex; /* 🔑 */
    align-items: center; /* 🔑 */
    justify-content: center; /* 🔑 */
    transition: all 0.2s;
  }

  .header-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0; /* avatar không co lại */

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <DashboardHeaderStyles>
      <Button
        className="header-button"
        onClick={() => navigate("/manage/add-post")}
      >
        Write New Post
      </Button>
      <div className="header-avatar">
        <img src="https://i.pravatar.cc/300" alt="User Avatar" />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
