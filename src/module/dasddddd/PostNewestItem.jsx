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

    &-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
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

const PostNewestItem = ({ post }) => {
  if (!post) return null;

  return (
    <PostNewestItemStyles>
      <a href={`/post/${post.slug || post.id}`} className="post-image">
        <img src={post.image} alt={post.title} />
      </a>
      <div className="post-content">
        {post.categories && post.categories.length > 0 && (
          <div className="post-categories">
            {post.categories.map((cat, index) => (
              <PostCategory key={index} type="secondary">
                {cat}
              </PostCategory>
            ))}
          </div>
        )}
        <h3 className="post-title">{post.title}</h3>
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
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
