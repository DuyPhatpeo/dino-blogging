// MobileNav.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { X, Home, BookOpen, User, LogOut, Grid3x3 } from "lucide-react";
import { db } from "@services/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@contexts/authContext";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MobileNavOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 50;
  animation: ${fadeIn} 0.3s ease-out;
`;

const MobileNavContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 320px;
  max-width: 85vw;
  background: ${(props) => props.theme.colors.background};
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
  z-index: 51;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 280px;
  }
`;

const MobileNavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};
  background: ${(props) => props.theme.colors.background};

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textLight || "#64748b"};
  transition: all 0.25s ease;

  &:hover {
    background: ${(props) =>
      props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
    color: ${(props) => props.theme.colors.text};
    transform: rotate(90deg); /* hiệu ứng xoay nhẹ */
  }
`;

const MobileNavContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textLight || "#64748b"};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    background: ${(props) =>
      props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
    transform: translateX(4px);
  }

  &.active {
    background: ${(props) => props.theme.colors.primary}15;
    color: ${(props) => props.theme.colors.primary};
    border-left: 3px solid ${(props) => props.theme.colors.primary};
  }
`;

const CategoryLink = styled(NavLink)`
  display: block;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textLight || "#64748b"};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
    color: ${(props) => props.theme.colors.text};
    transform: translateX(4px);
  }

  &.active {
    background: ${(props) => props.theme.colors.primary}15;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ef444415;
    transform: translateX(4px);
  }
`;

const AccountSection = styled.div`
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};
`;

const NAV_LINKS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/blog", label: "Blog", icon: BookOpen },
];

const MobileNav = ({ close }) => {
  const { user, signOut } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnap = await getDocs(collection(db, "categories"));
      const list = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(list);
    };
    fetchCategories();
  }, []);

  const handleSignOut = () => {
    signOut();
    close();
  };

  return (
    <>
      <MobileNavOverlay onClick={close} />
      <MobileNavContainer>
        <MobileNavHeader>
          <h2>Menu</h2>
          <CloseButton onClick={close}>
            <X /> {/* icon to hơn */}
          </CloseButton>
        </MobileNavHeader>

        <MobileNavContent>
          <NavSection>
            <SectionTitle>Navigation</SectionTitle>
            {NAV_LINKS.map(({ path, label, icon: Icon }) => (
              <NavLinkStyled key={path} to={path} onClick={close}>
                <Icon size={18} />
                {label}
              </NavLinkStyled>
            ))}
          </NavSection>

          {categories.length > 0 && (
            <NavSection>
              <SectionTitle>
                <Grid3x3 size={14} />
                Categories
              </SectionTitle>
              {categories.map((cat) => (
                <CategoryLink
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={close}
                >
                  {cat.name}
                </CategoryLink>
              ))}
            </NavSection>
          )}

          {user && (
            <AccountSection>
              <SectionTitle>
                <User size={14} />
                Account
              </SectionTitle>
              <LogoutButton onClick={handleSignOut}>
                <LogOut size={18} />
                Logout
              </LogoutButton>
            </AccountSection>
          )}
        </MobileNavContent>
      </MobileNavContainer>
    </>
  );
};

export default MobileNav;
