import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostNewestLargeStyles = styled.article`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 280px;
      border-radius: 16px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    &-category {
      margin-bottom: 10px;
      display: inline-block;
    }

    &-title {
      font-weight: 700;
      line-height: 1.4;
      display: block;
      font-size: 20px;
      margin-bottom: 12px;
      transition: color 0.2s ease;

      &:hover {
        color: ${(props) => props.theme.accent};
      }
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 500;
      color: ${(props) => props.theme.gray6B};
    }

    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 50%;
    }
  }

  @media screen and (min-width: 768px) {
    .post-image {
      height: 350px;
    }
    .post-title {
      font-size: 22px;
    }
  }

  @media screen and (min-width: 1024px) {
    .post-image {
      height: 433px;
    }
    .post-title {
      font-size: 26px;
    }
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <a href="/" className="post-image">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2294&q=80"
          alt="setup chill"
        />
      </a>
      <PostCategory>Kiến thức</PostCategory>
      <h3 className="post-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </h3>
      <div className="post-info">
        <span className="post-time">Mar 23</span>
        <span className="post-dot"></span>
        <span className="post-author">Andiez Le</span>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
