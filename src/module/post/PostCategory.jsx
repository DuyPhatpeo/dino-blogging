import React from "react";
import styled, { css } from "styled-components";

const categoryVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary}15; /* nhạt */
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary}15;
    color: ${({ theme }) => theme.colors.secondary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: #fff;
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success}15;
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
      background-color: ${({ theme }) => theme.colors.gray};
    }
  `,
};

const PostCategoryStyles = styled.span`
  display: inline-block;
  max-width: 160px; /* tránh quá dài */
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s ease-in-out;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
      title={children}
    >
      {children}
    </PostCategoryStyles>
  );
};

export default PostCategory;
