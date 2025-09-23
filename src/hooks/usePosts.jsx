// usePosts.js
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

export function usePosts(userId = null) {
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

  // Fetch users
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
    async function fetchPosts() {
      try {
        const colRef = collection(db, "posts");
        const q = query(colRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const result = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            image: data.image,
            slug: data.slug,
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
  }, []);

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

  // Toggle status với map trực quan
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

  // Enriched posts: map author info + category names
  const enrichedPosts = useMemo(() => {
    return posts
      .filter((post) => (userId ? post.authorId === userId : true))
      .map((post) => ({
        ...post,
        author: users[post.authorId]?.fullname || "Anonymous",
        avatar: users[post.authorId]?.avatar || "",
        role: users[post.authorId]?.role || 0,
        roleLabel: users[post.authorId]?.roleLabel || "USER",
        roleStyle: users[post.authorId]?.roleStyle || {
          bg: "#e5e7eb",
          color: "#374151",
        },
        userStatus: users[post.authorId]?.status || 0,
        userStatusLabel: users[post.authorId]?.statusLabel || "INACTIVE",
        userStatusStyle: users[post.authorId]?.statusStyle || {
          bg: "#f3f4f6",
          color: "#4b5563",
        },
        categoryNames: post.categoryIds.map(
          (catId) => categories[catId] || "Unknown"
        ),
      }));
  }, [posts, users, categories, userId]);

  return {
    posts: enrichedPosts,
    setPosts,
    categories,
    users,
    loading,
    toggleHot,
    toggleStatus,
  };
}
