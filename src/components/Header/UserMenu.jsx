// UserMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  User,
  LogOut,
  LayoutDashboard,
  FileText,
  ChevronDown,
} from "lucide-react";
import { db } from "@services/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@contexts/authContext";
import { userRole, userRoleLabel } from "@utils/constants";

const UserMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UserTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: ${(props) =>
    props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: ${(props) => props.theme.colors.primary}15;
    border-color: ${(props) => props.theme.colors.primary}30;
    transform: translateY(-1px);
  }

  &.active {
    background: ${(props) => props.theme.colors.primary}20;
    border-color: ${(props) => props.theme.colors.primary}50;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: ${(props) => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;

const ChevronIcon = styled(ChevronDown)`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  color: ${(props) => props.theme.colors.textLight || "#64748b"};

  @media (max-width: 480px) {
    display: none;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${(props) => props.theme.colors.background};
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};
  min-width: 240px;
  padding: 8px;
  z-index: 20;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible
      ? "translateY(0) scale(1)"
      : "translateY(-10px) scale(0.95)"};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: all 0.3s ease;
  transform-origin: top right;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};
  margin-bottom: 8px;
`;

const UserInfoAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: ${(props) => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .name {
    font-weight: 600;
    font-size: 14px;
    color: ${(props) => props.theme.colors.text};
  }

  .role {
    font-size: 12px;
    color: ${(props) => props.theme.colors.textLight || "#64748b"};
    background: ${(props) => props.theme.colors.primary}15;
    color: ${(props) => props.theme.colors.primary};
    padding: 2px 8px;
    border-radius: 6px;
    width: fit-content;
  }
`;

const MenuItems = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
    transform: translateX(4px);
  }

  &.active {
    background: ${(props) => props.theme.colors.primary}15;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const LogoutMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #ef4444;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  border-top: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};

  &:hover {
    background: #ef444415;
    transform: translateX(4px);
  }
`;

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    if (!user?.uid) return;
    const fetchUserData = async () => {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRole(data.role);
        setAvatarURL(data.avatar || null);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderRoleLink = () => {
    if (role === userRole.ADMIN) {
      return (
        <MenuItem to="/manage/dashboard" onClick={() => setOpen(false)}>
          <LayoutDashboard size={18} />
          Dashboard
        </MenuItem>
      );
    }
    if (role === userRole.AUTHOR) {
      return (
        <MenuItem to="/manage/my-posts" onClick={() => setOpen(false)}>
          <FileText size={18} />
          My Posts
        </MenuItem>
      );
    }
    return null;
  };

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  return (
    <UserMenuContainer ref={menuRef}>
      <UserTrigger
        className={open ? "active" : ""}
        onClick={() => setOpen(!open)}
      >
        <UserAvatar>
          {avatarURL ? (
            <img src={avatarURL} alt={user.displayName} />
          ) : (
            <User size={18} />
          )}
        </UserAvatar>
        <UserName>{user.displayName || "User"}</UserName>
        <ChevronIcon size={16} isOpen={open} />
      </UserTrigger>

      <DropdownContainer isVisible={open}>
        <UserInfo>
          <UserInfoAvatar>
            {avatarURL ? (
              <img src={avatarURL} alt={user.displayName} />
            ) : (
              <User size={20} />
            )}
          </UserInfoAvatar>
          <UserInfoText>
            <span className="name">{user.displayName || "User"}</span>
            <span className="role">{role ? userRoleLabel[role] : "User"}</span>
          </UserInfoText>
        </UserInfo>

        <MenuItems>
          {renderRoleLink()}
          <LogoutMenuItem onClick={handleSignOut}>
            <LogOut size={18} />
            Logout
          </LogoutMenuItem>
        </MenuItems>
      </DropdownContainer>
    </UserMenuContainer>
  );
};

export default UserMenu;
