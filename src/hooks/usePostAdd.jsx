import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";
import { toast } from "react-toastify";
import { postStatus } from "@utils/constants";
import { useImageUpload } from "@hooks/useImageUpload";
import { db } from "@services/firebase/firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// ✅ Yup schema validation
const schema = yup.object({
  title: yup.string().required("Title is required"),
  slug: yup.string(),
  category: yup
    .array()
    .min(1, "Please select at least one category")
    .required("Category is required"),
  image: yup.mixed().required("Thumbnail is required"),
  content: yup
    .string()
    .trim()
    .min(20, "Content must be at least 20 characters")
    .required("Content is required"),
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
      author: "",
      category: [],
      image: null,
      hot: false,
      content: "",
    },
  });

  // ✅ Handler add post
  const addPostHandler = async (values) => {
    try {
      setLoading(true);

      // ✅ xử lý slug: ưu tiên slug user nhập, nếu trống thì tạo từ title
      const slug = values.slug
        ? slugify(values.slug, { lower: true, strict: true })
        : slugify(values.title, { lower: true, strict: true });

      // ✅ upload thumbnail
      let imageUrl = "";
      if (values.image) {
        imageUrl = await uploadImage(values.image, "posts");
      }

      // ✅ lấy user hiện tại
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in to create a post.");

      // ✅ lấy thông tin user từ Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) throw new Error("User profile not found.");
      const userData = userSnap.data();

      // ✅ chuẩn hoá author object
      const author = {
        avatar: userData.avatar || "",
        email: userData.email || user.email,
        fullname: userData.fullname || user.displayName || "",
        slug:
          userData.slug ||
          slugify(userData.fullname || user.displayName || user.email, {
            lower: true,
            strict: true,
          }),
        uid: user.uid,
      };

      // ✅ chuẩn hoá categories
      const categories = Array.isArray(values.category)
        ? values.category.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
          }))
        : [];

      // ✅ newPost object
      const newPost = {
        title: values.title,
        slug,
        image: imageUrl,
        content: values.content,
        hot: values.hot,
        status: values.status,
        category: categories,
        author,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      };

      // ✅ lưu vào Firestore
      const docRef = await addDoc(collection(db, "posts"), newPost);

      // ✅ update state local
      setPosts((prev) => [...prev, { ...newPost, id: docRef.id }]);

      // ✅ reset form
      form.reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        author: "",
        category: [],
        image: null,
        hot: false,
        content: "",
      });

      toast.success("✅ Post added successfully!");
      navigate("/manage/post");
    } catch (error) {
      console.error("Error adding post:", error);
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
