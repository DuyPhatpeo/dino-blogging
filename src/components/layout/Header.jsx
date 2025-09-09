import React from "react";
import styled from "styled-components";
import { Search, User } from "lucide-react";
import Logo from "@assets/logo.png";
import Button from "../button/Button";
import { useAuth } from "@contexts/authContext";

const HeaderStyles = styled.header`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 14px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .logo img {
    height: 60px;
    object-fit: contain;
  }

  nav {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  nav a {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSize.base};
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .search {
    position: relative;

    input {
      border: 1px solid ${(props) => props.theme.colors.border};
      border-radius: ${(props) => props.theme.radius.md};
      padding: 8px 12px 8px 36px;
      font-size: ${(props) => props.theme.fontSize.sm};
      outline: none;
      transition: all 0.2s;
      min-width: 200px;
      background: #fff;

      &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px rgba(46, 178, 193, 0.2); /* dùng màu primary làm shadow */
      }
    }

    .search-icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: ${(props) => props.theme.colors.gray};
      width: 18px;
      height: 18px;
    }
  }

  .user {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
    padding: 6px 12px;
    background: ${(props) => props.theme.colors.background};
    border-radius: ${(props) => props.theme.radius.md};
    border: 1px solid ${(props) => props.theme.colors.primary};
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    span {
      font-size: ${(props) => props.theme.fontSize.sm};
    }

    &:hover {
      background: ${(props) => props.theme.colors.primaryHover}22; /* nhạt */
      transform: translateY(-1px);
    }
  }
`;

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const { user } = useAuth();

  return (
    <HeaderStyles>
      <div className="container">
        {/* Logo + Navigation */}
        <div className="left">
          <a href="/" className="logo">
            <img src={Logo} alt="Logo" />
          </a>
          <nav>
            {NAV_LINKS.map(({ path, label }) => (
              <a key={path} href={path}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Search + User/Sign In */}
        <div className="actions">
          <div className="search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search..." aria-label="Search" />
          </div>

          {user ? (
            <div className="user">
              <User size={20} />
              <span>{user.displayName || "User"}</span>
            </div>
          ) : (
            <a href="/signin">
              <Button>Sign In</Button>
            </a>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
