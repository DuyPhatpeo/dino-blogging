import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "src/temp/layout/Heading";
import PostFeatureItem from "@module/Post/PostFeatureItem";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { postStatus } from "@utils/constants"; // 👈 import constants

const HomeFeatureStyles = styled.section`
  padding: 40px 0;

  .home-heading {
    margin-bottom: 30px;
    text-align: left;
    font-size: 24px;
    font-weight: 700;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const colRef = collection(db, "posts");
      const q = query(colRef, orderBy("createdAt", "desc"), limit(20)); // lấy 20 bài mới nhất
      const snapshot = await getDocs(q);

      let result = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const postData = docSnap.data();

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

      // 🔥 lọc post.hot === true và status = APPROVED
      result = result
        .filter(
          (post) => post.hot === true && post.status === postStatus.APPROVED
        )
        .slice(0, 6);

      setPosts(result);
    }
    fetchPosts();
  }, []);

  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading className="home-heading">Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.length > 0 ? (
            posts.map((post) => <PostFeatureItem key={post.id} post={post} />)
          ) : (
            <p>Không có bài viết nổi bật</p>
          )}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
