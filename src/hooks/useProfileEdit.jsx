// hooks/useProfileEdit.js
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@services/firebase/firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const useProfileEdit = (user, reset) => {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  // 🔹 Lấy avatar mặc định
  const getDefaultAvatar = async () => {
    try {
      const avatarRef = ref(storage, "avatars/default.jpeg");
      return await getDownloadURL(avatarRef);
    } catch {
      return "https://via.placeholder.com/150?text=Default+Avatar";
    }
  };

  // 🔹 Fetch user data
  useEffect(() => {
    if (!user?.uid) return;
    const fetchUser = async () => {
      try {
        const refDoc = doc(db, "users", user.uid);
        const snap = await getDoc(refDoc);
        if (snap.exists()) {
          const data = snap.data();
          setProfile(data);
          reset(data);
        }
      } catch (err) {
        console.error("🔥 Fetch user error:", err);
      }
    };
    fetchUser();
  }, [user, reset]);

  // 🔹 Upload ảnh
  const uploadImage = async (file) => {
    const imageRef = ref(storage, `avatars/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  // 🔹 Xoá ảnh cũ
  const deleteImage = async (url) => {
    if (!url) return;
    try {
      const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
    } catch (err) {
      console.warn("⚠️ Không thể xoá avatar cũ:", err.message);
    }
  };

  // 🔹 Update profile
  const updateProfile = async (values) => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      const refDoc = doc(db, "users", user.uid);
      const snap = await getDoc(refDoc);
      const oldData = snap.data();
      let avatarUrl = oldData?.avatar || "";

      // Case 1: upload file mới
      if (values.avatar instanceof File) {
        if (avatarUrl && !avatarUrl.includes("default.jpeg")) {
          await deleteImage(avatarUrl);
        }
        avatarUrl = await uploadImage(values.avatar);
      }

      // Case 2: clear avatar
      if (values.avatar === null) {
        if (avatarUrl && !avatarUrl.includes("default.jpeg")) {
          await deleteImage(avatarUrl);
        }
        avatarUrl = await getDefaultAvatar();
      }

      // Case 3: chưa có avatar → dùng default
      if (!avatarUrl) {
        avatarUrl = await getDefaultAvatar();
      }

      await updateDoc(refDoc, {
        fullname: values.fullname,
        email: values.email,
        username: values.username.trim().toLowerCase(),
        avatar: avatarUrl,
        updatedAt: serverTimestamp(),
      });

      setProfile({ ...values, avatar: avatarUrl, updatedAt: new Date() });
    } catch (err) {
      console.error("🔥 Update user error:", err);
    } finally {
      setSaving(false);
    }
  };

  return { profile, saving, updateProfile };
};
