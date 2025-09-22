// Header.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "@assets/logo.png";
import Button from "@components/Button/Button";
import { useAuth } from "@contexts/authContext";
import NavMenu from "@components/Header/NavMenu";
import MobileNav from "@components/Header/MobileNav";
import UserMenu from "@components/Header/UserMenu";

const HeaderContainer = styled.header`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: inherit;
    backdrop-filter: inherit;
    z-index: -1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 64px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 42px;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    img {
      height: 36px;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const SignInButton = styled(Button)`
  padding: 10px 24px;
  font-weight: 500;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: 2px solid ${(props) => props.theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${(props) => props.theme.colors.primary}40;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <Container>
        <LeftSection>
          <LogoLink to="/">
            <img src={Logo} alt="Logo" />
          </LogoLink>
          <NavMenu />
        </LeftSection>

        <RightSection>
          {user ? (
            <UserMenu />
          ) : (
            <NavLink to="/sign-in">
              <SignInButton>Sign In</SignInButton>
            </NavLink>
          )}
          <MenuToggle onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuToggle>
        </RightSection>
      </Container>

      {menuOpen && <MobileNav close={() => setMenuOpen(false)} />}
    </HeaderContainer>
  );
};

export default Header;
