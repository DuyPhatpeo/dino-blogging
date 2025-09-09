import React from "react";
import styled, { css } from "styled-components";

const categoryVariants = {
  primary: css`
    background-color: #f3f4f6;
    color: #4b5563;
    &:hover {
      background-color: #4b5563;
      color: #fff;
    }
  `,
  secondary: css`
    background-color: #fff;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    &:hover {
      background-color: #f3f4f6;
    }
  `,
  success: css`
    background-color: #e6f9ed;
    color: #22c55e;
    &:hover {
      background-color: #22c55e;
      color: #fff;
    }
  `,
  danger: css`
    background-color: #fde8e8;
    color: #ef4444;
    &:hover {
      background-color: #ef4444;
      color: #fff;
    }
  `,
  dark: css`
    background-color: #111827;
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
  border-radius: 9999px;
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
