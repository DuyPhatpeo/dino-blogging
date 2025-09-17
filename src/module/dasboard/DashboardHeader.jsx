import React from "react";
import styled from "styled-components";
import Button from "@components/button/Button";
import { useNavigate } from "react-router-dom";
import { Home, FilePlus, Menu } from "lucide-react";

const DashboardHeaderStyles = styled.header`
  background-color: #fff;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  /* Nút menu cho mobile */
  .menu-toggle {
    display: none;
    @media (max-width: 767px) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
      svg {
        width: 22px;
        height: 22px;
      }
      &:hover {
        background: ${(props) => props.theme.grayLight};
      }
    }
  }

  /* Button chung */
  .header-button {
    font-weight: 500;
    font-size: 0.95rem;
    height: 42px;
    padding: 0 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;

    svg {
      width: 18px;
      height: 18px;
    }

    span {
      display: inline;
    }

    &:hover {
      background: ${(props) => props.theme.grayLight};
    }

    @media (max-width: 640px) {
      padding: 0 12px;
      span {
        display: none; /* Ẩn chữ trên mobile */
      }
    }
  }

  /* Avatar user */
  .header-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    border: 2px solid ${(props) => props.theme.primary};

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

const DashboardHeader = ({ onToggleMenu }) => {
  const navigate = useNavigate();
  return (
    <DashboardHeaderStyles>
      <div className="header-left">
        {/* Nút menu (chỉ hiện trên mobile) */}
        <div className="menu-toggle" onClick={onToggleMenu}>
          <Menu />
        </div>
        <Button className="header-button" onClick={() => navigate("/")}>
          <Home /> <span>Home</span>
        </Button>
      </div>

      <div className="header-right">
        <Button
          className="header-button"
          onClick={() => navigate("/manage/add-post")}
        >
          <FilePlus /> <span>Write Post</span>
        </Button>
        <div className="header-avatar">
          <img src="https://i.pravatar.cc/300" alt="User Avatar" />
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
