import LoadingSpinner from "@components/loading/LoadingSpinner";
import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background: ${(props) => props.theme.colors.primary};
    &:hover {
      background: ${(props) => props.theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${(props) => props.theme.colors.secondary};
    &:hover {
      background: ${(props) => props.theme.colors.secondaryHover};
    }
  `,
  success: css`
    background: ${(props) => props.theme.colors.success};
    &:hover {
      background: #059669;
    }
  `,
  error: css`
    background: ${(props) => props.theme.colors.error};
    &:hover {
      background: ${(props) => props.theme.colors.deleteHover || "#DC2626"};
    }
  `,
  warning: css`
    background: ${(props) => props.theme.colors.warning};
    &:hover {
      background: #d97706;
    }
  `,
  detail: css`
    background: ${(props) => props.theme.colors.detail};
    &:hover {
      background: ${(props) => props.theme.colors.detailHover};
    }
  `,
  edit: css`
    background: ${(props) => props.theme.colors.edit};
    &:hover {
      background: ${(props) => props.theme.colors.editHover};
    }
  `,
  delete: css`
    background: ${(props) => props.theme.colors.delete};
    &:hover {
      background: ${(props) => props.theme.colors.deleteHover};
    }
  `,
};

const ButtonStyles = styled.button`
  padding: 10px 32px;
  border-radius: ${(props) => props.theme.radius.md || "10px"};
  color: #fff;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.base || "16px"};
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${(props) => variantStyles[props.variant] || variantStyles.primary};

  &:hover {
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  ...props
}) => {
  return (
    <ButtonStyles
      variant={variant}
      {...props}
      disabled={isLoading || props.disabled}
    >
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
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "detail",
    "edit",
    "delete",
  ]),
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  type: "button",
  variant: "primary",
};

export default Button;
