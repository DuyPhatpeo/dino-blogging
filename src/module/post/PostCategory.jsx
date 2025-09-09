import React from "react";
import styled, { css } from "styled-components";

const categoryVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.gray};
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray};
      color: #fff;
    }
  `,
  secondary: css`
    background-color: #fff;
    color: ${({ theme }) => theme.colors.gray};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover {
      background-color: ${({ theme }) => theme.colors.grayLight};
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success}15; /* nhạt */
    color: ${({ theme }) => theme.colors.success};
    &:hover {
      background-color: ${({ theme }) => theme.colors.success};
      color: #fff;
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error}15;
    color: ${({ theme }) => theme.colors.error};
    &:hover {
      background-color: ${({ theme }) => theme.colors.error};
      color: #fff;
    }
  `,
  dark: css`
    background-color: ${({ theme }) => theme.colors.grayDark};
    color: #fff;
    &:hover {
      opacity: 0.9;
    }
  `,
};

const PostCategoryStyles = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  ${(props) => categoryVariants[props.$type] || categoryVariants.primary};
`;

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  onClick,
}) => {
  return (
    <PostCategoryStyles
      $type={type}
      className={`post-category ${className}`}
      onClick={onClick}
    >
      {children}
    </PostCategoryStyles>
  );
};

export default PostCategory;
