import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${({ theme }) => theme.radius.lg};
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    &-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textLight};
      margin-top: auto;
    }

    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }

    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: ${({ theme }) => theme.fontSize.base};
      margin-bottom: 8px;
      color: ${({ theme }) => theme.colors.text};
      transition: color 0.2s ease;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const PostItem = ({ post }) => {
  if (!post) return null;

  return (
    <PostItemStyles>
      {/* ✅ Link ảnh bài viết */}
      <a href={`/post/${post.slug || post.id}`} className="post-image">
        <img src={post.image} alt={post.title} />
      </a>

      {/* ✅ Nhiều category */}
      {post.categories && post.categories.length > 0 && (
        <div className="post-categories">
          {post.categories.map((cat, index) => (
            <PostCategory key={index}>{cat}</PostCategory>
          ))}
        </div>
      )}

      {/* ✅ Tiêu đề */}
      <h3 className="post-title">{post.title}</h3>

      {/* ✅ Thông tin phụ */}
      <div className="post-info">
        <span className="post-time">
          {post.createdAt
            ? new Date(post.createdAt.seconds * 1000).toLocaleDateString(
                "vi-VN"
              )
            : "N/A"}
        </span>
        <span className="post-dot"></span>
        <span className="post-author">{post.author || "Unknown"}</span>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
