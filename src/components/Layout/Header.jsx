import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Search,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import Logo from "@assets/logo.png";
import Button from "@components/Button/Button";
import { useAuth } from "@contexts/authContext";
import { db } from "@services/firebase/firebase-config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { userRoleLabel } from "@utils/constants";

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
    position: relative;
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

  /* Category Menu */
  .category-menu {
    position: relative;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${(props) => props.theme.colors.text};
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: #fff;
      border: 1px solid ${(props) => props.theme.colors.border};
      border-radius: ${(props) => props.theme.radius.md};
      box-shadow: ${(props) => props.theme.shadow.card};
      animation: fadeIn 0.2s ease;
      z-index: 1000;
      padding: 12px;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 8px 16px;
      min-width: 320px;
      max-height: 400px;
      overflow-y: auto;

      a {
        padding: 6px 8px;
        font-size: ${(props) => props.theme.fontSize.sm};
        color: ${(props) => props.theme.colors.text};
        text-decoration: none;
        border-radius: ${(props) => props.theme.radius.sm};
        white-space: nowrap;

        &:hover {
          background: ${(props) => props.theme.colors.primary}11;
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 20px;
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
      border-radius: ${(props) => props.theme.radius.md};
      border: 1px solid ${(props) => props.theme.colors.primary};
      cursor: pointer;
      background: #fff;
      transition: background 0.2s, transform 0.2s;

      &:hover {
        background: ${(props) => props.theme.colors.primary}11;
        transform: translateY(-1px);
      }

      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
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
      min-width: 180px;
      animation: fadeIn 0.2s ease;

      .user-info {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-bottom: 1px solid ${(props) => props.theme.colors.border};

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .info-text {
          display: flex;
          flex-direction: column;
          font-size: ${(props) => props.theme.fontSize.sm};
          font-weight: 500;
          color: ${(props) => props.theme.colors.text};
        }

        .role {
          font-size: 0.75rem;
          color: #6b7280;
        }
      }

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

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    color: ${(props) => props.theme.colors.text};
  }

  /* Mobile Menu Styles */
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    animation: fadeInOverlay 0.3s ease;
  }

  .mobile-nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 75vw; /* 3/4 màn hình */
    max-width: 400px; /* Giới hạn tối đa */
    min-width: 300px; /* Giới hạn tối thiểu */
    height: 100vh;
    background: #fff;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    animation: slideInRight 0.3s ease;
    overflow-y: auto;

    .close-btn {
      align-self: flex-end;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.colors.text};
      border-radius: 50%;
      transition: background 0.2s;

      &:hover {
        background: ${(props) => props.theme.colors.primary}11;
      }
    }

    a {
      display: block;
      padding: 12px 16px;
      color: ${(props) => props.theme.colors.text};
      text-decoration: none;
      font-weight: 500;
      font-size: ${(props) => props.theme.fontSize.base};
      border-radius: ${(props) => props.theme.radius.md};
      margin-bottom: 4px;
      transition: all 0.2s;

      &:hover,
      &.active {
        background: ${(props) => props.theme.colors.primary}11;
        color: ${(props) => props.theme.colors.primary};
      }
    }

    button {
      display: block;
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      color: ${(props) => props.theme.colors.text};
      font-weight: 500;
      font-size: ${(props) => props.theme.fontSize.base};
      text-align: left;
      border-radius: ${(props) => props.theme.radius.md};
      margin-bottom: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: ${(props) => props.theme.colors.primary}11;
        color: ${(props) => props.theme.colors.primary};
      }
    }

    /* Category Section */
    .categories-section {
      border-top: 1px solid ${(props) => props.theme.colors.border};
      padding-top: 16px;
      margin-top: 16px;

      .section-title {
        font-size: ${(props) => props.theme.fontSize.sm};
        font-weight: 600;
        color: ${(props) => props.theme.colors.text};
        padding: 8px 16px;
        margin-bottom: 8px;
        opacity: 0.7;
      }
    }

    /* User Section */
    .user-section {
      border-top: 1px solid ${(props) => props.theme.colors.border};
      padding-top: 16px;
      margin-top: 16px;
    }
  }

  /* Body scroll lock khi menu mở */
  &.menu-open {
    body {
      overflow: hidden;
      position: fixed;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    nav,
    .search {
      display: none;
    }
    .menu-toggle {
      display: block;
    }
    .user-menu .user span {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .mobile-nav {
      width: 85vw; /* Trên màn hình nhỏ hơn thì rộng hơn */
      min-width: 280px;
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

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const NAV_LINKS = [{ path: "/", label: "Home" }];

const Header = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRole, setLoadingRole] = useState(true);
  const [avatarURL, setAvatarURL] = useState(null);
  const [roleName, setRoleName] = useState(null);
  const timerRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  // Effect để lock/unlock body scroll khi menu mở/đóng
  useEffect(() => {
    if (menuOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
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
          setAvatarURL(data.avatar || null);
          setRoleName(userRoleLabel[data.role] || "User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAdmin(false);
      } finally {
        setLoadingRole(false);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnap = await getDocs(collection(db, "categories"));
        const list = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(list);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderStyles className={menuOpen ? "menu-open" : ""}>
      <div className="container">
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
            {/* Category Dropdown */}
            <div
              className="category-menu"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories <ChevronDown size={16} />
              {showCategories && (
                <div className="dropdown">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <NavLink key={cat.id} to={`/category/${cat.slug}`}>
                        {cat.name}
                      </NavLink>
                    ))
                  ) : (
                    <span style={{ padding: "10px 14px", color: "#6b7280" }}>
                      No categories
                    </span>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="actions">
          {user ? (
            <div
              className="user-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="user">
                {avatarURL ? (
                  <img src={avatarURL} alt={user.displayName} />
                ) : (
                  <User size={20} />
                )}
                <span>{user.displayName || "User"}</span>
              </div>
              {dropdownOpen && (
                <div className="dropdown">
                  <div className="user-info">
                    {avatarURL && (
                      <img src={avatarURL} alt={user.displayName} />
                    )}
                    <div className="info-text">
                      <span>{user.displayName || "User"}</span>
                      <span className="role">{roleName}</span>
                    </div>
                  </div>
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

      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={closeMobileMenu} />
          <div className="mobile-nav">
            <button className="close-btn" onClick={closeMobileMenu}>
              <X size={24} />
            </button>

            {/* Main Navigation */}
            {NAV_LINKS.map(({ path, label }) => (
              <NavLink key={path} to={path} onClick={closeMobileMenu}>
                {label}
              </NavLink>
            ))}

            {/* Categories Section */}
            {categories.length > 0 && (
              <div className="categories-section">
                <div className="section-title">Categories</div>
                {categories.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={closeMobileMenu}
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
            )}

            {/* User Section */}
            {user && (
              <div className="user-section">
                {!loadingRole && isAdmin && (
                  <NavLink to="/dashboard" onClick={closeMobileMenu}>
                    Dashboard
                  </NavLink>
                )}
                <button onClick={signOut}>Logout</button>
              </div>
            )}
          </div>
        </>
      )}
    </HeaderStyles>
  );
};

export default Header;
