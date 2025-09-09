import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.lg};
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;

  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      transition: transform 0.4s ease;
    }

    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7) 20%,
        rgba(0, 0, 0, 0.4) 60%,
        rgba(0, 0, 0, 0) 100%
      );
      z-index: 5;
    }

    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: ${({ theme }) => theme.colors.text};
    }

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: ${({ theme }) => theme.fontSize.sm};
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
      opacity: 0.9;
      color: ${({ theme }) => theme.colors.textLight};
    }

    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 50%;
    }

    &-title {
      font-weight: 700;
      line-height: 1.4;
      font-size: 20px;
      color: #fff; /* Giữ trắng vì overlay tối */
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    }
  }

  &:hover .post-image {
    transform: scale(1.05);
  }

  @media screen and (min-width: 1024px) {
    height: 280px;

    .post-title {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  }
`;

const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <img
        src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2662&q=80"
        alt="unsplash"
        className="post-image"
      />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory type="secondary">Kiến thức</PostCategory>
          <div className="post-info">
            <span className="post-time">Mar 23</span>
            <span className="post-dot"></span>
            <span className="post-author">Andiez Le</span>
          </div>
        </div>
        <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
