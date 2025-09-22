import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { auth, db } from "@services/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { userRole } from "@utils/constants";
import { useAuth } from "@contexts/authContext";

const SidebarStyles = styled.div`
  width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${(props) => (props.$isOpen ? "0" : "-260px")};
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 0 12px 12px 0;
  display: flex;
  flex-direction: column;
  z-index: 200;
  transition: left 0.3s ease;

  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 0 12px;
    img {
      max-width: 36px;
    }
    margin-bottom: 24px;
    padding: 20px 20px 0;
    font-size: 1.1rem;
    color: ${(props) => props.theme.primary};
  }

  .menu {
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    flex: 1;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 16px;
    font-weight: 500;
    font-size: 0.95rem;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }

  @media (min-width: 768px) {
    left: 0;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 300;
  background: ${(props) => props.theme.primary};
  color: white;
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 150;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentUserRole, setCurrentUserRole] = useState(user?.role || null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (user?.uid && !user?.role) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUserRole(docSnap.data().role);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };
    fetchUserRole();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      signOut();
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ⚡️ Build menu theo role
  let sidebarLinks = [
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard /> },
  ];

  if (currentUserRole === userRole.ADMIN) {
    sidebarLinks.push(
      { title: "Post", url: "/manage/post", icon: <FileText /> },
      { title: "Category", url: "/manage/category", icon: <FolderKanban /> },
      { title: "User", url: "/manage/user", icon: <Users /> }
    );
  } else if (currentUserRole === userRole.AUTHOR) {
    sidebarLinks.push(
      { title: "My Posts", url: "/manage/my-posts", icon: <FileText /> },
      { title: "Category", url: "/manage/category", icon: <FolderKanban /> }
    );
  } else {
    // USER thường chỉ có Dashboard thôi
  }

  // Logout cho tất cả
  sidebarLinks.push({
    title: "Logout",
    url: "/",
    icon: <LogOut />,
    onClick: handleLogout,
  });

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </ToggleButton>

      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <SidebarStyles $isOpen={isOpen}>
        <div className="sidebar-logo">
          <img srcSet="/logo.png 2x" alt="logo" />
          <span>Monkey Blogging</span>
        </div>
        <div className="menu">
          {sidebarLinks.map((link) => (
            <NavLink
              to={link.url}
              className="menu-item"
              key={link.title}
              onClick={() => {
                if (link.onClick) link.onClick();
                setIsOpen(false);
              }}
            >
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </NavLink>
          ))}
        </div>
      </SidebarStyles>
    </>
  );
};

export default Sidebar;
