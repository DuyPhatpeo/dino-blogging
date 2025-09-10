import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Search, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "@assets/logo.png";
import Button from "../button/Button";
import { useAuth } from "@contexts/authContext";

const HeaderStyles = styled.header`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 14px 0;
  position: sticky;
  top: 0;
  z-index: 50;

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
    height: 50px;
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
    position: relative;
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
        box-shadow: 0 0 0 2px rgba(46, 178, 193, 0.2);
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

  .user-menu {
    position: relative;

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
        background: ${(props) => props.theme.colors.primaryHover}22;
        transform: translateY(-1px);
      }
    }

    .dropdown {
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      background: #fff;
      border: 1px solid ${(props) => props.theme.colors.border};
      border-radius: ${(props) => props.theme.radius.md};
      box-shadow: ${(props) => props.theme.shadow.card};
      display: flex;
      flex-direction: column;
      min-width: 160px;
      z-index: 100;

      a,
      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        font-size: ${(props) => props.theme.fontSize.sm};
        color: ${(props) => props.theme.colors.text};
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;

        &:hover {
          background: ${(props) => props.theme.colors.primary}11;
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    color: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    nav {
      display: none;
    }
    .search {
      display: none;
    }
    .menu-toggle {
      display: block;
    }
    .mobile-nav {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background: ${(props) => props.theme.colors.background};
      box-shadow: ${(props) => props.theme.shadow.card};
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      z-index: 40;
    }
  }
`;

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 250); // delay 250ms
  };

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

        {/* Actions */}
        <div className="actions">
          <div className="search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search..." aria-label="Search" />
          </div>

          {user ? (
            <div
              className="user-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="user">
                <User size={20} />
                <span>{user.displayName || "User"}</span>
              </div>
              {dropdownOpen && (
                <div className="dropdown">
                  <a href="/dashboard">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </a>
                  <button onClick={signOut}>
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/signin">
              <Button>Sign In</Button>
            </a>
          )}

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="mobile-nav">
          {NAV_LINKS.map(({ path, label }) => (
            <a key={path} href={path} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          {user && (
            <>
              <a href="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </a>
              <button onClick={signOut}>Logout</button>
            </>
          )}
        </div>
      )}
    </HeaderStyles>
  );
};

export default Header;
