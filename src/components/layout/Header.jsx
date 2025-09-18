import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Search, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "@assets/logo.png";
import Button from "../button/Button";
import { useAuth } from "@contexts/authContext";
import { db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const HeaderStyles = styled.header`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 14px 0;
  position: sticky;
  top: 0;
  z-index: 100;

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
    height: 46px;
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

    &.active,
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
      min-width: 200px;
      background: #fff;
      transition: all 0.2s;
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

  /* User dropdown */
  .user-menu {
    position: relative;
    .user {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: ${(props) => props.theme.colors.primary};
      padding: 6px 12px;
      border-radius: ${(props) => props.theme.radius.md};
      border: 1px solid ${(props) => props.theme.colors.primary};
      cursor: pointer;
      background: #fff;
      transition: background 0.2s, transform 0.2s;
      &:hover {
        background: ${(props) => props.theme.colors.primary}11;
        transform: translateY(-1px);
      }
      span {
        font-size: ${(props) => props.theme.fontSize.sm};
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
      animation: fadeIn 0.2s ease;
      a,
      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        font-size: ${(props) => props.theme.fontSize.sm};
        color: ${(props) => props.theme.colors.text};
        border: none;
        background: transparent;
        cursor: pointer;
        text-align: left;
        &:hover {
          background: ${(props) => props.theme.colors.primary}11;
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }

  /* Mobile */
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    color: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    nav,
    .search {
      display: none;
    }
    .menu-toggle {
      display: block;
    }

    /* 🔥 Ẩn tên user khi mobile */
    .user-menu .user span {
      display: none;
    }

    .mobile-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 998;
    }

    .mobile-nav {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 260px;
      background: ${(props) => props.theme.colors.background};
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      z-index: 999;
      animation: slideInRight 0.3s ease forwards;

      a,
      button {
        text-align: left;
        font-size: ${(props) => props.theme.fontSize.base};
        font-weight: 500;
        color: ${(props) => props.theme.colors.text};
        text-decoration: none;
        border: none;
        background: none;
        padding: 10px 0;
        &:hover {
          color: ${(props) => props.theme.colors.primary};
        }
      }

      .close-btn {
        align-self: flex-end;
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        color: ${(props) => props.theme.colors.text};
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRole, setLoadingRole] = useState(true);
  const timerRef = useRef(null);

  // 🔥 check role trong Firestore
  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.uid) {
        setIsAdmin(false);
        setLoadingRole(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsAdmin(data.role === 1 || data.role === 2);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setIsAdmin(false);
      } finally {
        setLoadingRole(false);
      }
    };
    fetchRole();
  }, [user]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  return (
    <HeaderStyles>
      <div className="container">
        {/* Logo + Nav */}
        <div className="left">
          <NavLink to="/" className="logo">
            <img src={Logo} alt="Logo" />
          </NavLink>
          <nav>
            {NAV_LINKS.map(({ path, label }) => (
              <NavLink key={path} to={path}>
                {label}
              </NavLink>
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
                  {!loadingRole && isAdmin && (
                    <NavLink to="/dashboard">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </NavLink>
                  )}
                  <button onClick={signOut}>
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/sign-in">
              <Button>Sign In</Button>
            </NavLink>
          )}

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav + overlay */}
      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-nav">
            {/* Close button */}
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <X size={24} />
            </button>

            {NAV_LINKS.map(({ path, label }) => (
              <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
            {user && (
              <>
                {!loadingRole && isAdmin && (
                  <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </NavLink>
                )}
                <button onClick={signOut}>Logout</button>
              </>
            )}
          </div>
        </>
      )}
    </HeaderStyles>
  );
};

export default Header;
