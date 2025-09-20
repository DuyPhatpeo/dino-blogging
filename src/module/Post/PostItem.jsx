import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostItemStyles = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;

  .post-image {
    flex-shrink: 0;
    width: 360px; /* ✅ rộng hơn */
    height: 220px; /* ✅ cao hơn */
    border-radius: ${({ theme }) => theme.radius.lg};
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

  .post-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .post-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
  }

  .post-title {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  /* ✅ truncate khi có class single-line */
  &.single-line .post-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textLight};
    margin-top: auto;
  }

  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
`;

const PostItem = ({ post, className }) => {
  if (!post) return null;

  return (
    <PostItemStyles className={className}>
      <a href={`/post/${post.slug || post.id}`} className="post-image">
        <img src={post.image} alt={post.title} />
      </a>

      <div className="post-content">
        {post.categories && post.categories.length > 0 && (
          <div className="post-categories">
            {post.categories.map((cat, index) => (
              <PostCategory key={index}>{cat}</PostCategory>
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
    </PostItemStyles>
  );
};

export default PostItem;
