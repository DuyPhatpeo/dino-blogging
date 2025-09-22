import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  LogOut,
  X,
  Edit3,
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
  display: flex;
  flex-direction: column;
  z-index: 200;
  transition: left 0.3s ease;

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
    .logo {
      display: flex;
      align-items: center;
      font-weight: 600;
      gap: 8px;
      img {
        max-width: 32px;
      }
      color: ${(props) => props.theme.primary};
    }
    .close-btn {
      display: none;
      cursor: pointer;
      svg {
        width: 22px;
        height: 22px;
      }
      @media (max-width: 767px) {
        display: block;
      }
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    padding: 12px;
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

  /* Desktop: sidebar luôn fixed, không overlay */
  @media (min-width: 768px) {
    left: 0;
    border-radius: 0;
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

const sidebarConfig = {
  [userRole.ADMIN]: [
    { title: "My Posts", url: "/manage/my-posts", icon: <Edit3 /> },
    { title: "Post", url: "/manage/post", icon: <FileText /> },
    { title: "Category", url: "/manage/category", icon: <FolderKanban /> },
    { title: "User", url: "/manage/user", icon: <Users /> },
  ],
  [userRole.MODERATOR]: [
    { title: "My Posts", url: "/manage/my-posts", icon: <FileText /> },
    { title: "Post", url: "/manage/post", icon: <FileText /> },
    { title: "Category", url: "/manage/category", icon: <FolderKanban /> },
  ],
  [userRole.AUTHOR]: [
    { title: "My Posts", url: "/manage/my-posts", icon: <FileText /> },
    { title: "Category", url: "/manage/category", icon: <FolderKanban /> },
  ],
  [userRole.USER]: [],
};

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentUserRole, setCurrentUserRole] = useState(user?.role || null);

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

  const sidebarLinks = [
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard /> },
    ...(sidebarConfig[currentUserRole] || []),
    { title: "Logout", url: "/", icon: <LogOut />, onClick: handleLogout },
  ];

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarStyles $isOpen={isOpen}>
        <div className="sidebar-header">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
            <span>Monkey Blogging</span>
          </div>
          <div className="close-btn" onClick={onClose}>
            <X />
          </div>
        </div>
        <div className="menu">
          {sidebarLinks.map((link) => (
            <NavLink
              to={link.url}
              className="menu-item"
              key={link.title}
              onClick={() => {
                if (link.onClick) link.onClick();
                onClose();
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
