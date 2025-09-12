import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "@/components/layout/Heading";
import PostFeatureItem from "@/module/post/PostFeatureItem";
import { db } from "@/firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";

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
      const q = query(colRef, orderBy("createdAt", "desc"), limit(6));
      const snapshot = await getDocs(q);

      const result = await Promise.all(
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

      setPosts(result);
    }
    fetchPosts();
  }, []);

  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading className="home-heading">Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
