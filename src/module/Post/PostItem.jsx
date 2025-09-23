import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@services/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import PostCategory from "./PostCategory";

const PostItemStyles = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;

  .post-image {
    flex-shrink: 0;
    width: 360px;
    height: 220px;
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
  const [author, setAuthor] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySlugs, setCategorySlugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!post?.authorId) return;
      try {
        const docRef = doc(db, "users", post.authorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAuthor(docSnap.data());
        }
      } catch (error) {
        console.error("Failed to fetch author:", error);
      }
    };

    const fetchCategories = async () => {
      if (!post?.categoryIds?.length) return;
      try {
        const results = await Promise.all(
          post.categoryIds.map(async (catId) => {
            const catRef = doc(db, "categories", catId);
            const catSnap = await getDoc(catRef);
            if (catSnap.exists()) {
              const data = catSnap.data();
              return { name: data.name, slug: data.slug };
            }
            return { name: "Unknown", slug: "" };
          })
        );
        setCategories(results.map((c) => c.name));
        setCategorySlugs(results.map((c) => c.slug));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchAuthor();
    fetchCategories();
  }, [post?.authorId, post?.categoryIds]);

  if (!post) return null;

  return (
    <PostItemStyles className={className}>
      <a href={`/post/${post.slug || post.id}`} className="post-image">
        <img src={post.image} alt={post.title} />
      </a>

      <div className="post-content">
        {categories.length > 0 && (
          <div className="post-categories">
            {categories.map((cat, index) => (
              <PostCategory
                key={index}
                type="secondary"
                onClick={() => {
                  if (categorySlugs[index])
                    navigate(`/category/${categorySlugs[index]}`);
                }}
                style={{ cursor: "pointer" }}
              >
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
          <span className="post-author">{author?.fullname || "Unknown"}</span>
        </div>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
