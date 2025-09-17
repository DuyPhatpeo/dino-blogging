import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  LogOut,
} from "lucide-react";
import { auth, db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { userRole } from "@/utils/constants";
import { useAuth } from "@/contexts/authContext";

const SidebarStyles = styled.div`
  width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 0 12px 12px 0;
  display: flex;
  flex-direction: column;
  z-index: 100;

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
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentUserRole, setCurrentUserRole] = useState(user?.role || null);

  // fallback: nếu context chưa có role thì lấy từ Firestore
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
      signOut(); // clear context + localStorage
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarLinks = [
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard /> },
    { title: "Post", url: "/manage/post", icon: <FileText /> },
    { title: "Category", url: "/manage/category", icon: <FolderKanban /> },
    ...(currentUserRole === userRole.ADMIN
      ? [{ title: "User", url: "/manage/user", icon: <Users /> }]
      : []),
    { title: "Logout", url: "/", icon: <LogOut />, onClick: handleLogout },
  ];

  return (
    <SidebarStyles>
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
            onClick={link.onClick}
          >
            <span className="menu-icon">{link.icon}</span>
            <span className="menu-text">{link.title}</span>
          </NavLink>
        ))}
      </div>
    </SidebarStyles>
  );
};

export default Sidebar;
