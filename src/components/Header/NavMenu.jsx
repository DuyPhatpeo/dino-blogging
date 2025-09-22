// NavMenu.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { db } from "@services/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkStyled = styled(NavLink)`
  position: relative;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
  padding: 8px 0;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${(props) => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};

    &::after {
      width: 100%;
    }
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};

    &::after {
      width: 100%;
    }
  }
`;

const CategoryMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: 8px 0;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid
    ${(props) => props.theme.colors.border || "rgba(0, 0, 0, 0.1)"};
  min-width: 200px;
  padding: 8px;
  z-index: 10;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(-10px)"};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.theme.colors.backgroundLight || "rgba(0, 0, 0, 0.05)"};
    color: ${(props) => props.theme.colors.primary};
    transform: translateX(4px);
  }

  &.active {
    background: ${(props) => props.theme.colors.primary}15;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const EmptyState = styled.span`
  display: block;
  padding: 12px 16px;
  color: ${(props) => props.theme.colors.textLight || "#64748b"};
  font-size: 14px;
  font-style: italic;
`;

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
];

const NavMenu = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnap = await getDocs(collection(db, "categories"));
      const list = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(list);
    };
    fetchCategories();
  }, []);

  return (
    <NavContainer>
      {NAV_LINKS.map(({ path, label }) => (
        <NavLinkStyled key={path} to={path}>
          {label}
        </NavLinkStyled>
      ))}

      <CategoryMenuContainer
        isOpen={showCategories}
        onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}
      >
        Categories
        <ChevronDown size={16} />
        <DropdownContainer isVisible={showCategories}>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <DropdownItem key={cat.id} to={`/category/${cat.slug}`}>
                {cat.name}
              </DropdownItem>
            ))
          ) : (
            <EmptyState>No categories</EmptyState>
          )}
        </DropdownContainer>
      </CategoryMenuContainer>
    </NavContainer>
  );
};

export default NavMenu;
