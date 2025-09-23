import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostItem from "@module/Post/PostItem";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { postStatus } from "@utils/constants";
import LoadingSpinner from "@components/Loading/LoadingSpinner";

const PostByCategoryStyles = styled.section`
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 32px;
    color: #1e3a8a;
    text-align: center;
  }

  .list-layout {
    display: flex;
    flex-direction: column; // 1 bài 1 hàng
    gap: 24px;
    min-height: 200px; // spinner căn giữa
  }

  .post-card {
    width: 100%;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }

    .post-content {
      padding: 20px;
    }
  }

  .no-post {
    font-style: italic;
    color: #555;
    text-align: center;
    padding: 40px 0;
  }

  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }
`;

const PostByCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({ id: null, name: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryCache = useMemo(() => ({}), []);

  useEffect(() => {
    let isMounted = true;

    const fetchCategoryAndPosts = async () => {
      setLoading(true);
      try {
        const catQuery = query(
          collection(db, "categories"),
          where("slug", "==", slug)
        );
        const catSnap = await getDocs(catQuery);

        if (catSnap.empty) {
          if (isMounted) {
            setCategory({ id: null, name: "Không tìm thấy category" });
            setPosts([]);
          }
          setLoading(false);
          return;
        }

        const catDoc = catSnap.docs[0];
        const catId = catDoc.id;
        const catName = catDoc.data().name;

        if (isMounted) setCategory({ id: catId, name: catName });

        const postSnap = await getDocs(
          query(collection(db, "posts"), orderBy("createdAt", "desc"))
        );

        const allPosts = [];
        const allCategoryIds = new Set();

        postSnap.docs.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.status === postStatus.APPROVED) {
            allPosts.push({ id: docSnap.id, ...data });
            data.categoryIds?.forEach((id) => allCategoryIds.add(id));
          }
        });

        // cache tên category
        await Promise.all(
          Array.from(allCategoryIds).map(async (id) => {
            if (!categoryCache[id]) {
              const catRef = doc(db, "categories", id);
              const catSnap = await getDoc(catRef);
              categoryCache[id] = catSnap.exists()
                ? catSnap.data().name
                : "Unknown";
            }
          })
        );

        const enrichedPosts = allPosts.map((post) => ({
          ...post,
          categories: post.categoryIds?.map((id) => categoryCache[id]) || [],
        }));

        const filteredPosts = enrichedPosts.filter((post) =>
          post.categoryIds?.includes(catId)
        );

        if (isMounted) setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategoryAndPosts();

    return () => {
      isMounted = false;
    };
  }, [slug, categoryCache]);

  return (
    <PostByCategoryStyles>
      <h2>{category.name}</h2>
      <div className="list-layout">
        {loading ? (
          <div className="loading-wrapper">
            <LoadingSpinner />
          </div>
        ) : posts.length ? (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              <PostItem post={post} />
            </div>
          ))
        ) : (
          <p className="no-post">
            Hiện chưa có bài viết nào trong danh mục này.
          </p>
        )}
      </div>
    </PostByCategoryStyles>
  );
};

export default PostByCategory;
