import React from "react";
import styled from "styled-components";

const FooterStyles = styled.footer`
  padding: 20px 24px;
  background: #f3f4f6;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;

  .links {
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  a {
    color: #374151;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #111827;
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
