import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@services/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import PostCategory from "./PostCategory";

const PostNewestLargeStyles = styled.article`
  padding-top: 20px;

  .post {
    &-image {
      display: block;
      margin-bottom: 24px;
      height: 280px;
      border-radius: ${({ theme }) => theme.radius.lg};
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

    &-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }

    &-title {
      font-weight: 700;
      line-height: 1.4;
      display: block;
      font-size: ${({ theme }) => theme.fontSize.lg};
      margin-bottom: 14px;
      transition: color 0.2s ease;
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

  @media screen and (min-width: 768px) {
    .post-image {
      height: 350px;
    }
    .post-title {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  }

  @media screen and (min-width: 1024px) {
    .post-image {
      height: 433px;
    }
    .post-title {
      font-size: ${({ theme }) => theme.fontSize["2xl"]};
    }
  }
`;

const PostNewestLarge = ({ post }) => {
  const [author, setAuthor] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySlugs, setCategorySlugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch author
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

    // fetch category names + slug
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
    <PostNewestLargeStyles>
      <a href={`/post/${post.slug || post.id}`} className="post-image">
        <img src={post.image} alt={post.title} />
      </a>

      {categories.length > 0 && (
        <div className="post-categories">
          {categories.map((cat, index) => (
            <PostCategory
              key={index}
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
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
