import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { db, storage } from "@services/firebase/firebase-config";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { userRole, userStatus } from "@utils/constants";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// ✅ Yup schema
const schema = yup.object({
  fullname: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.number().required("Role is required"),
  status: yup.number().required("Status is required"),
});

export function useUserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      role: userRole.USER,
      status: userStatus.ACTIVE,
      avatar: "",
    },
  });

  const { reset } = form;

  // 🔹 Lấy avatar mặc định trong Storage
  const getDefaultAvatar = async () => {
    try {
      const avatarRef = ref(storage, "avatars/default.jpeg");
      return await getDownloadURL(avatarRef);
    } catch {
      console.warn("⚠️ Không tìm thấy avatars/default.jpeg trong Storage");
      return "https://via.placeholder.com/150?text=Default+Avatar";
    }
  };

  // 🚀 Load dữ liệu user
  useEffect(() => {
    async function fetchUser() {
      try {
        if (!id) return;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          reset(docSnap.data());
        } else {
          toast.error("User not found!");
          navigate("/manage/user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching user data");
      }
    }
    fetchUser();
  }, [id, reset, navigate]);

  // 🔹 Upload ảnh
  const uploadImage = async (file, folder = "avatars") => {
    const imageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  // 🔹 Xoá ảnh
  const deleteImage = async (url) => {
    if (!url) return;
    try {
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
    } catch (err) {
      console.warn("⚠️ Không xóa được ảnh cũ:", err.message);
    }
  };

  // 🔹 Submit cập nhật user
  const updateUserHandler = async (values) => {
    try {
      setLoading(true);
      const docRef = doc(db, "users", id);

      // Lấy user cũ
      const oldSnap = await getDoc(docRef);
      const oldData = oldSnap.data();
      let avatarUrl = oldData?.avatar || "";

      // Case 1: Upload avatar mới
      if (values.avatar instanceof File) {
        if (avatarUrl && !avatarUrl.includes("default.jpeg")) {
          await deleteImage(avatarUrl);
        }
        avatarUrl = await uploadImage(values.avatar, "avatars");
      }

      // Case 2: Xoá avatar → thay bằng default
      if (values.avatar === null) {
        if (avatarUrl && !avatarUrl.includes("default.jpeg")) {
          await deleteImage(avatarUrl);
        }
        avatarUrl = await getDefaultAvatar();
      }

      // Case 3: Nếu vẫn không có avatar → dùng default luôn
      if (!avatarUrl) {
        avatarUrl = await getDefaultAvatar();
      }

      await updateDoc(docRef, {
        fullname: values.fullname,
        email: values.email,
        role: Number(values.role),
        status: Number(values.status),
        avatar: avatarUrl,
        updatedAt: serverTimestamp(),
      });

      toast.success("User updated successfully!");
      navigate("/manage/user");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.message || "Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    updateUserHandler,
    loading,
  };
}
