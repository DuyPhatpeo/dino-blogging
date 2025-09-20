import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "@components/Layout/Heading";
import PostItem from "@module/Post/PostItem";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { postStatus } from "@utils/constants";

const PostPageStyles = styled.section`
  padding: 40px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .post-list {
    display: grid;
    gap: 24px;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const colRef = collection(db, "posts");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const result = await Promise.all(
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

      // chỉ lấy post APPROVED
      setPosts(result.filter((post) => post.status === postStatus.APPROVED));
    }

    fetchPosts();
  }, []);

  if (posts.length === 0) return <p>Đang tải bài viết...</p>;

  return (
    <PostPageStyles>
      <div className="container">
        <Heading>Tất cả bài viết</Heading>
        <div className="post-list">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PostPageStyles>
  );
};

export default PostPage;
