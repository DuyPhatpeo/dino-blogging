// useMyPosts.js
import { useEffect, useState } from "react";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
// import { postStatus } from "@/utils/constants";

export function useMyPosts(userId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchPosts() {
      try {
        const colRef = collection(db, "posts");
        const q = query(colRef, orderBy("createdAt", "desc")); // lấy tất cả
        const snapshot = await getDocs(q);

        const result = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title,
              image: data.image,
              author: data.author?.fullname || "Anonymous",
              authorAvatar: data.author?.avatar || "",
              authorEmail: data.author?.email || "",
              category: Array.isArray(data.category) ? data.category : [],
              status: data.status,
              createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate().toLocaleDateString("vi-VN")
                : "",
              hot: data.hot || false,
              createdBy: data.createdBy || "", // 👈 quan trọng
            };
          })
          // 👇 lọc sau khi map
          .filter((post) => post.createdBy === userId);

        setPosts(result);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]);

  // Toggle hot
  const toggleHot = async (postId, currentHot) => {
    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { hot: !currentHot });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, hot: !currentHot } : p))
      );
    } catch (error) {
      console.error("Error updating hot status:", error);
    }
  };

  // Toggle status
  const toggleStatus = async (postId, currentStatus) => {
    const flow = [2, 1, 4, 3]; // pending -> approved -> hidden -> rejected
    const currentIndex = flow.indexOf(currentStatus);
    const nextStatus = flow[(currentIndex + 1) % flow.length];

    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { status: nextStatus });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: nextStatus } : p))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return { posts, setPosts, loading, toggleHot, toggleStatus };
}
