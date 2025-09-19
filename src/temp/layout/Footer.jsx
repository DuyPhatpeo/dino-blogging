import React from "react";
import styled from "styled-components";

const FooterStyles = styled.footer`
  padding: 20px 24px;
  background: ${(props) => props.theme.colors.background};
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.textLight};
  border-top: 1px solid ${(props) => props.theme.colors.border};

  .links {
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  a {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme.colors.grayDark};
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div className="links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/contact">Contact</a>
      </div>
      <p>© {new Date().getFullYear()} Dino Bloggin. All rights reserved.</p>
    </FooterStyles>
  );
};

export default Footer;
