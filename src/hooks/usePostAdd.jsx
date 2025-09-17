import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";
import { toast } from "react-toastify";
import { postStatus } from "@/utils/constants";
import { useImageUpload } from "@hooks/useImageUpload";
import { db } from "@/firebase/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// ✅ Yup schema
const schema = yup.object({
  title: yup.string().required("Title is required"),
  slug: yup.string(),
  author: yup.string().required("Author is required"), // nhập text
  category: yup
    .array()
    .min(1, "Please select at least one category")
    .required("Category is required"),
  image: yup.mixed().required("Thumbnail is required"),
});

export function usePostAdd() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uploadProgress, uploadImage } = useImageUpload();
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      author: "", // nhập trực tiếp
      category: [],
      image: null,
      hot: false,
    },
  });

  const addPostHandler = async (values) => {
    try {
      setLoading(true);

      // tạo slug tự động nếu trống
      const slug =
        values.slug || slugify(values.title, { lower: true, strict: true });

      // upload ảnh
      let imageUrl = "";
      if (values.image) {
        imageUrl = await uploadImage(values.image, "posts");
      }

      // lấy user từ Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("You must be logged in to create a post.");
      }

      // ✅ newPost có cả "author" (người nhập) và "createdBy" (người đăng nhập)
      const newPost = {
        ...values,
        slug,
        image: imageUrl,
        author: values.author, // nhập tay
        createdBy: user.uid, // người tạo
        createdAt: serverTimestamp(),
      };

      // lưu Firestore
      const docRef = await addDoc(collection(db, "posts"), newPost);

      // cập nhật local state
      setPosts((prev) => [...prev, { ...newPost, id: docRef.id }]);

      // reset form
      form.reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        author: "",
        category: [],
        image: null,
        hot: false,
      });

      toast.success("✅ Post added successfully!");
      navigate("/manage/post");
    } catch (error) {
      console.error("❌ Error adding post:", error);
      toast.error(error.message || "Error adding post");
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    uploadProgress,
    form,
    addPostHandler,
    loading,
  };
}
