import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  padding: 14px;
  border-radius: 14px;
  background: ${(props) => props.theme.primary};
  color: white;
  font-weight: 700;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  margin-top: 10px;

  &:hover {
    background: ${(props) => props.theme.primaryHover || "#23939f"};
    transform: translateY(-3px);
  }
`;

const Button = ({ children, ...props }) => {
  return <ButtonStyles {...props}>{children}</ButtonStyles>;
};

export default Button;
