import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostNewestItemStyles = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }

  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 160px;
      height: 120px;
      border-radius: ${({ theme }) => theme.radius.md};
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-category {
      margin-bottom: 8px;
    }

    &-title {
      font-weight: 700;
      line-height: 1.4;
      font-size: ${({ theme }) => theme.fontSize.base};
      margin-bottom: 8px;
      transition: color 0.2s ease;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.text};

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textLight};
    }

    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 50%;
    }
  }

  /* Responsive */
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    .post-image {
      width: 100%;
      height: 200px;
    }
  }
`;

const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <a href="/" className="post-image">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="post thumbnail"
        />
      </a>
      <div className="post-content">
        <PostCategory type="secondary">Kiến thức</PostCategory>
        <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
        <div className="post-info">
          <span className="post-time">Mar 23</span>
          <span className="post-dot"></span>
          <span className="post-author">Andiez Le</span>
        </div>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
