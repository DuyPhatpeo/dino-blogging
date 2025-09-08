import React from "react";
import styled from "styled-components";
import { Search } from "lucide-react";
import Logo from "@assets/logo.png";
import Button from "../button/Button";

const HeaderStyles = styled.header`
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
    color: #333;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.2s;

    &:hover {
      color: #23939f;
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
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 8px 12px 8px 36px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
      min-width: 200px;

      &:focus {
        border-color: #23939f;
        box-shadow: 0 0 0 2px rgba(35, 147, 159, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: #666;
      width: 18px;
      height: 18px;
    }
  }
`;

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => (
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

      {/* Search + Sign In */}
      <div className="actions">
        <div className="search">
          <Search className="search-icon" />
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
        <a href="/signin">
          <Button>Sign In</Button>
        </a>
      </div>
    </div>
  </HeaderStyles>
);

export default Header;
