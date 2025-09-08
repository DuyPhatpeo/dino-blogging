import LoadingSpinner from "@components/loading/LoadingSpinner";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonStyles = styled.button`
  padding: 10px 32px;
  border-radius: 14px;
  background: ${(props) => props.theme.primary};
  color: white;
  font-weight: 700;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${(props) => props.theme.primaryHover || "#23939f"};
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({ children, isLoading = false, ...props }) => {
  return (
    <ButtonStyles {...props} disabled={isLoading || props.disabled}>
      {isLoading ? <LoadingSpinner size="20px" borderSize="3px" /> : children}
    </ButtonStyles>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  type: "button",
};

export default Button;
