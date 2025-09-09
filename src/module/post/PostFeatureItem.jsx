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

    &-category {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 15;
      max-width: 120px; /* giới hạn chiều rộng */
      white-space: nowrap; /* luôn 1 dòng */
      overflow: hidden; /* ẩn phần dư */
      text-overflow: ellipsis; /* thêm ... nếu quá dài */
    }

    &-title {
      font-weight: 700;
      line-height: 1.4;
      font-size: 20px;
      color: #fff;
      margin-bottom: 8px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: #f1f1f1;
      opacity: 0.9;
    }

    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 50%;
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

      <PostCategory type="secondary">Kiến thức</PostCategory>

      <div className="post-content">
        <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
        <div className="post-info">
          <span className="post-time">Mar 23</span>
          <span className="post-dot"></span>
          <span className="post-author">Andiez Le</span>
        </div>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
