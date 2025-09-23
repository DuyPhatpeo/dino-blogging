// useMyPosts.js
import { useEffect, useState, useMemo } from "react";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  userRoleLabel,
  userRoleStyle,
  userStatusLabel,
  userStatusStyle,
  postStatus,
  postStatusLabel,
  postStatusStyle,
} from "@utils/constants"; // cập nhật đường dẫn đúng

export function useMyPosts(userId) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const colRef = collection(db, "categories");
        const snapshot = await getDocs(colRef);
        const map = {};
        snapshot.docs.forEach((doc) => {
          map[doc.id] = doc.data().name;
        });
        setCategories(map);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch users (author info)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);
        const map = {};
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          map[doc.id] = {
            fullname: data.fullname || "Anonymous",
            avatar: data.avatar || "",
            role: data.role,
            roleLabel: userRoleLabel[data.role] || "USER",
            roleStyle: userRoleStyle[data.role] || {
              bg: "#e5e7eb",
              color: "#374151",
            },
            status: data.status,
            statusLabel: userStatusLabel[data.status] || "INACTIVE",
            statusStyle: userStatusStyle[data.status] || {
              bg: "#f3f4f6",
              color: "#4b5563",
            },
          };
        });
        setUsers(map);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Fetch posts
  useEffect(() => {
    if (!userId) return;

    async function fetchPosts() {
      try {
        const colRef = collection(db, "posts");
        const q = query(colRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const result = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title,
            slug: data.slug,
            image: data.image,
            content: data.content,
            authorId: data.authorId || data.createdBy || "",
            categoryIds: Array.isArray(data.categoryIds)
              ? data.categoryIds
              : [],
            status: data.status,
            statusLabel: postStatusLabel[data.status] || "UNKNOWN",
            statusStyle: postStatusStyle[data.status] || {
              bg: "#e5e7eb",
              color: "#374151",
            },
            hot: data.hot || false,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleDateString("vi-VN")
              : "",
          };
        });

        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
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

  // Toggle status using map
  const nextStatusMap = {
    [postStatus.PENDING]: postStatus.APPROVED,
    [postStatus.APPROVED]: postStatus.HIDDEN,
    [postStatus.HIDDEN]: postStatus.REJECTED,
    [postStatus.REJECTED]: postStatus.PENDING,
  };

  const toggleStatus = async (postId, currentStatus) => {
    const nextStatus = nextStatusMap[currentStatus] || postStatus.PENDING;
    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { status: nextStatus });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                status: nextStatus,
                statusLabel: postStatusLabel[nextStatus],
                statusStyle: postStatusStyle[nextStatus],
              }
            : p
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Map category names + filter by current user
  const myPosts = useMemo(() => {
    return posts
      .filter((p) => p.authorId === userId)
      .map((p) => ({
        ...p,
        categoryNames: p.categoryIds.map((id) => categories[id] || "Unknown"),
      }));
  }, [posts, categories, userId]);

  return {
    posts: myPosts,
    setPosts,
    categories,
    users,
    loading,
    toggleHot,
    toggleStatus,
  };
}
