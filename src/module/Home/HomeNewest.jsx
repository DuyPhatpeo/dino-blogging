import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "@components/Layout/Heading";
import PostItem from "@module/Post/PostItem";
import PostNewestItem from "@module/Post/PostNewestItem";
import PostNewestLarge from "@module/Post/PostNewestLarge";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { postStatus } from "@utils/constants";

const HomeNewestStyles = styled.section`
  padding: 40px 0;

  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 64px;
    align-items: start;

    @media screen and (min-width: 1024px) {
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }
  }

  .sidebar {
    padding: 24px 20px;
    background-color: #f3edff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* ✅ mỗi post 1 dòng riêng */
  .list-layout {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 40px;
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const colRef = collection(db, "posts");
      const q = query(colRef, orderBy("createdAt", "desc"), limit(10));
      const snapshot = await getDocs(q);

      let result = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const postData = docSnap.data();

          // lấy tên category từ id
          let categoryNames = [];
          if (Array.isArray(postData.category)) {
            categoryNames = await Promise.all(
              postData.category.map(async (catId) => {
                const catRef = doc(db, "categories", catId);
                const catSnap = await getDoc(catRef);
                return catSnap.exists() ? catSnap.data().name : "Unknown";
              })
            );
          }

          return {
            id: docSnap.id,
            ...postData,
            categories: categoryNames,
          };
        })
      );

      // 🔥 lọc status = APPROVED
      result = result.filter((post) => post.status === postStatus.APPROVED);

      setPosts(result);
    }
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  const [firstPost, ...restPosts] = posts;
  const sidebarPosts = restPosts.slice(0, 3);
  const listPosts = restPosts.slice(3);

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          {firstPost && <PostNewestLarge post={firstPost} />}
          <div className="sidebar">
            {sidebarPosts.map((post) => (
              <PostNewestItem key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* ✅ mỗi post nằm 1 dòng */}
        <div className="list-layout">
          {listPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
