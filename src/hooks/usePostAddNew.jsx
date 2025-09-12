import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { postStatus } from "@/utils/constants";
import { useImageUpload } from "@hooks/useImageUpload";
import { db } from "@/firebase/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export function usePostAddNew() {
  const [posts, setPosts] = useState([]);
  const { uploadProgress, uploadImage } = useImageUpload();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      author: "",
      categoryId: [], // mảng id cho multi-select
      image: null,
      hot: false,
    },
  });

  const addPostHandler = async (values) => {
    try {
      // tạo slug nếu trống
      if (!values.slug) {
        values.slug = slugify(values.title, { lower: true, strict: true });
      }

      // upload ảnh nếu có
      let imageUrl = "";
      if (values.image) {
        imageUrl = await uploadImage(values.image, "posts");
      }

      // Lấy user hiện tại từ Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("You must be logged in to create a post.");
      }

      // newPost giữ nguyên category là mảng id
      const newPost = {
        ...values,
        image: imageUrl,
        userId: user.uid, // tham chiếu user
        createdBy: user.uid, // id người tạo (cho query/filter)
        createdAt: serverTimestamp(),
      };

      // lưu lên Firestore
      const docRef = await addDoc(collection(db, "posts"), newPost);

      // lưu vào state local để hiển thị ngay
      setPosts((prev) => [...prev, { ...newPost, id: docRef.id }]);

      // reset form
      form.reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        author: "",
        categoryId: [],
        image: null,
        hot: false,
      });

      console.log("✅ Post added with ID:", docRef.id);
    } catch (error) {
      console.error("❌ Error adding post:", error);
    }
  };

  return {
    posts,
    uploadProgress,
    form,
    addPostHandler,
  };
}
