import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "@assets/logo.png";
import {
  LayoutDashboard,
  FileText,
  LayoutGrid,
  User,
  LogOut,
} from "lucide-react";

const SidebarStyles = styled.div`
  width: 280px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 1.2rem;

    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }

    span {
      color: ${(props) => props.theme.primary || "#00b894"};
    }
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80 || "#555"};
    transition: all 0.2s;

    &:hover {
      background-color: #f1fbf7;
      color: ${(props) => props.theme.primary || "#00b894"};
    }

    &.active {
      background-color: #e0f7ef;
      color: ${(props) => props.theme.primary || "#00b894"};
    }

    .menu-icon {
      display: flex;
      align-items: center;
    }
  }

  .menu-text {
    flex: 1;
  }
`;

const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { title: "Post", url: "/manage/post", icon: <FileText size={20} /> },
  {
    title: "Category",
    url: "/manage/category",
    icon: <LayoutGrid size={20} />,
  },
  { title: "User", url: "/manage/user", icon: <User size={20} /> },
  { title: "Logout", url: "/", icon: <LogOut size={20} /> },
];

const Sidebar = () => {
  return (
    <SidebarStyles>
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
        <span>Dino Blogging</span>
      </div>

      {sidebarLinks.map((link) => (
        <NavLink
          to={link.url}
          key={link.title}
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span className="menu-icon">{link.icon}</span>
          <span className="menu-text">{link.title}</span>
        </NavLink>
      ))}
    </SidebarStyles>
  );
};

export default Sidebar;
